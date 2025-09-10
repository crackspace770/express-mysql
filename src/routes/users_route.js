const express = require('express');

const userController = require('../controller/users_controller.js');

const router = express.Router();

const upload = require('../middleware/multer.js');

//READ-GET
router.get('/getUser', userController.getAllUsers);

//LOGIN - POST
router.post('/login', userController.loginUser);

//CREATE-POST
router.post('/createUser', userController.createUser);

//UPDATE-PUT
router.put('/updateUser/:id_user', userController.updateUser);

//DELETE
router.delete('/deleteUser/:id_user', userController.deleteUser);

module.exports = router;