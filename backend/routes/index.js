const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");


router.get('/api/users', userController.allUsers);
router.post('/api/user/register', userController.createUser);
router.put('/api/user/:id/update', userController.updateUser);
router.delete('/api/user/:id/delete', userController.deleteUser);


module.exports = router;