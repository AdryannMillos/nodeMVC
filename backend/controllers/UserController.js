const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const allUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const userData = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ message: user.email + " REGISTERED" });
            })
            .catch((error) => {
              res.send("ERROR: " + error);
            });
        });
      } else {
        res.json({ error: " EMAIL ALREADY EXISTS" });
      }
    })
    .catch((err) => {
      res.send("ERROR: " + err);
    });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userFound = await User.findByPk(userId);
  const userData = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  userFound
    .update(userData)
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch((error) => {
      res.send("ERROR: " + error);
    });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (user) {
    User.destroy({ where: { id: userId } });
    res.status(201).send("User with id: " + userId + " deleted");
  } else {
    res.status(404).send("user with " + userId + " id not found");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (error) => {
      res.send("Error: ", error.message);
    }
  );
  if (!userWithEmail) {
    return res.status(401).json({ message: "Email or password not found" });
  }
  if (!bcrypt.compareSync(password, userWithEmail.password)){
    return res.status(401).json({ message: "Email or password not found" });
  }

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      firstname: userWithEmail.firstname,
      lastname: userWithEmail.lastname,
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({message: "Welcome Back!", token: jwtToken});
};
module.exports = {
  allUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
};
