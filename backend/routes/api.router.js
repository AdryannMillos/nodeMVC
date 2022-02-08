const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authTest = require("../controllers/authTest");
const passport = require("passport");

router.get("/api/v1/users", userController.allUsers);
router.get("/api/v1/user/:id", userController.singleUser);
router.post("/api/v1/user/register", userController.createUser);
router.put("/api/v1/user/:id/update", userController.updateUser);
router.delete("/api/v1/user/:id/delete", userController.deleteUser);
router.post("/api/v1/user/login", userController.loginUser);

router.get(
  "/api/v1/auth/test",
  passport.authenticate("jwt", { session: false }),
  authTest.test
);

module.exports = router;
