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
    INSERT INTO products (product_name, product_category, description, product_quantity, product_price, product_weight) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [body.productName, body.productCategory, body.description, body.productQuantity, body.productPrice, body.productWeight]);

}

const updateProduct = (body, product_id) =>{

    const SQLQuery = `
    UPDATE products 
    SET product_name = '${body.productName}', 
    product_category = '${body.productCategory}', 
    description = '${body.description}', 
    product_quantity = ${body.productQuantity}, 
    product_price = ${body.productPrice}, 
    product_weight = ${body.productWeight} 
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