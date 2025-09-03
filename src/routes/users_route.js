const express = require('express');

const userController = require('../controller/users_controller.js');

const router = express.Router();

//READ-GET
router.get('/getUser', userController.getAllUsers);

//CREATE-POST
router.post('/createUser', userController.createUser);

//UPDATE-PUT
router.put('/updateUser/:id_user', userController.updateUser);

//DELETE
router.delete('/deleteUser/:id_user', userController.deleteUser);

module.exports = router;