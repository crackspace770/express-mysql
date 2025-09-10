const express = require('express');

const productController = require('../controller/product_controller.js');

const router = express.Router();

//READ-GET
router.get('/getProduct', productController.getAllProducts);
router.get('/getProduct/:product_id', productController.getProductById);

//CREATE-POST
router.post('/createProduct', productController.createProduct);

//UPDATE-PUT
router.put('/updateProduct/:product_id', productController.updateProduct);

//DELETE
router.delete('/deleteProduct/:product_id', productController.deleteProduct);

module.exports = router;
