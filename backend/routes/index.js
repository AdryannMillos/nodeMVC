const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");


router.get('/api', userController.allUsers);
router.post('/api/register', userController.createUser);


module.exports = router;