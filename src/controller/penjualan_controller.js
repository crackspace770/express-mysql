const { get } = require('http');
const PenjualanModel = require('../models/penjualan_model.js');    
const fs = require('fs');

const getAllPenjualan = async (req, res) => {
    try {
        const [rows] = await PenjualanModel.getAllPenjualan();
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data penjualan'
        });
    }
};

// ✅ Get penjualan by ID
const getPenjualanById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await PenjualanModel.getPenjualanById(id);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Penjualan dengan id ${id} tidak ditemukan`
            });
        }
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail penjualan'
        });
    }
};

// ✅ Create penjualan with detail
const createPenjualanWithDetail = async (req, res) => {
    try {
        let { penjualan, detail_barang } = req.body;

        // Jika datang dalam bentuk string JSON, parse manual
        if (typeof penjualan === "string") {
            penjualan = JSON.parse(penjualan);
        }
        if (typeof detail_barang === "string") {
            detail_barang = JSON.parse(detail_barang);
        }

        // Pastikan detail_barang jadi array
        if (!Array.isArray(detail_barang)) {
            return res.status(400).json({
                success: false,
                message: "detail_barang harus array"
            });
        }

        const result = await PenjualanModel.createPenjualanWithDetail(penjualan, detail_barang);

        res.status(201).json({
            success: true,
            message: "Penjualan berhasil ditambahkan",
            result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan penjualan"
        });
    }
};


// ✅ Delete penjualan
const deletePenjualan = async (req, res) => {
    const { id } = req.params;
    try {
        await PenjualanModel.deletePenjualan(id);
        res.json({
            success: true,
            message: `Penjualan dengan id ${id} berhasil dihapus`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus penjualan'
        });
    }
};

module.exports = {
    getAllPenjualan,
    getPenjualanById,
    createPenjualanWithDetail,
    deletePenjualan
}

