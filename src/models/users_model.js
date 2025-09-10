const dbPool = require('../config/database.js');

const getAllUsers = ()  => {

    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

const getUserbyEmail = (email) =>{
    const SQLQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    return dbPool.execute(SQLQuery, [email]);
}

const createUser = (body) => {
    const SQLQuery = `
    INSERT INTO users (name, email, address, password) 
    VALUES (?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [body.name, body.email, body.address, body.password]);
}

const updateUser = (body, id_user) => {
    const SQLQuery = 
    `UPDATE users 
    SET name = '${body.name}', 
    email = '${body.email}', 
    address = '${body.address}' 
    WHERE id_users = ${id_user}`

    return dbPool.execute(SQLQuery);
}

const deleteUser = (id_user) => {
    const SQLQuery = `DELETE FROM users WHERE id_users = ${id_user}`

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getUserbyEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
