const ProductModel = require('../models/product_model.js');    
const fs = require('fs');

const getAllProducts = async (req, res) => {

    try{

        const [data, fields] = await ProductModel.getAllProducts();
        
        res.status(200).json({
            message: "GET All Products",
            data: data        
        });

    }catch(error){
        res.status(500).json({
            message: "Error retrieving products",
            error: error.message
        });
    }

}

const getProductById = async (req, res) => {

    const product_id = req.params.product_id;

    try{
        const [data, fields] = await ProductModel.getProductById(product_id);
        if(data.length === 0){
            return res.status(404).json({
                message: "Product not found",
                data: null
            });
        }else{
            res.status(200).json({
                message: "GET Product by ID",
                data: data[0]
            });
        }
    }catch(error){
        res.status(500).json({
            message: "Error retrieving product",
            error: error.message
        });

    }

};

    const createProduct = async (req, res) => {
    const body = req.body;

    if (!body || !body.productName || !body.productCategory || !body.description || 
        !body.productQuantity || !body.productPrice || !body.productWeight) {
        return res.status(400).json({
            message: "Bad Request",
            error: "All fields are required",
            data: null
        });
    }

    try {
        await ProductModel.createProduct(body);
        res.status(201).json({
            message: "Product created successfully",
            data: {productName: body.productName, productCategory: body.productCategory, description: body.description, productQuantity: body.productQuantity, productPrice: body.productPrice, productWeight: body.productWeight}
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    const { product_id } = req.params;
    const { body } = req;

    // Validasi input minimal ada 1 field
    if (!body.name && !body.category && !body.description && 
        !body.quantity && !body.price && !body.weight) {
        return res.status(400).json({
            message: "Bad Request",
            error: "At least one field is required to update",
            data: null
        });
    }

    try {
        const [result] = await ProductModel.updateProduct(body, product_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found",
                data: null
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: {productName: body.productName, productCategory: body.productCategory, description: body.description, productQuantity: body.productQuantity, productPrice: body.productPrice, productWeight: body.productWeight}
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }
};


    const deleteProduct = async (req, res) => {
        const {product_id} = req.params;

        try{
            if(!product_id){
                return res.status(400).json({
                    message: "Bad Request",
                    error: "Product ID is required",
                    data: null
                });
            }

            await ProductModel.deleteProduct(product_id);

            res.status(200).json({
                message: "Product deleted successfully",
                data: null
            });

        }catch(error){
            res.status(500).json({
                message: "Error deleting product",
                error: error.message
            })
        }
    }

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

