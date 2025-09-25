const express = require('express');

const penjualanController = require('../controller/penjualan_controller.js');

const router = express.Router();

router.post('/getPenjualan', penjualanController.getAllPenjualan);

router.post('/getPenjualanById', penjualanController.getPenjualanById);

router.post('createPenjualan', penjualanController.createPenjualanWithDetail);

router.delete('/deletePenjualan/:id', penjualanController.deletePenjualan);

module.exports = router;