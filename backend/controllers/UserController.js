const User = require("../models/User");
const bcrypt = require("bcrypt")
 
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
    }

    await User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json({ status: user.email + " REGISTERED" })
                    })
                    .catch(err => {
                        res.send('ERROR: ' + err)
                    })
                })
            } else {
                res.json({ error: " USER ALREADY EXISTS" })
            }
        })
        .catch(err => {
            res.send('ERROR: ' + err)
        })

    }
module.exports = {
  allUsers,
  createUser,
};
