const dbPool = require('../config/database.js');

const getAllProducts = ()  => {
    const SQLQuery = 'SELECT * FROM products';

    return dbPool.execute(SQLQuery);
}

const getProductById = (product_id) => {
    const SQLQuery = 'SELECT * FROM products WHERE product_id = ? LIMIT 1';
    return dbPool.execute(SQLQuery, [product_id]);
}

const createProduct = (body) => {

const SQLQuery = `
    INSERT INTO products (product_name, product_category, description, product_quantity, product_price, product_weight, product_image) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [body.productName, body.productCategory, body.description, body.productQuantity, body.productPrice, body.productWeight, body.productImage]);

}

const updateProduct = (body, product_id) =>{

    const SQLQuery = `
    UPDATE products 
    SET product_name = '${body.name}', 
    product_category = '${body.category}', 
    description = '${body.description}', 
    product_quantity = ${body.quantity}, 
    product_price = ${body.price}, 
    product_weight = ${body.weight}, 
    product_image = '${body.image}' 
    WHERE product_id = ${product_id}`;

    return dbPool.execute(SQLQuery);
}

const deleteProduct = (product_id) => {
    const SQLQuery = `DELETE FROM products WHERE product_id = ${product_id}`
    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};