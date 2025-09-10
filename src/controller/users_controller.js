const UserModel = require('../models/users_model.js');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {

    try{

    const [data, fields] = await UserModel.getAllUsers();
    
    res.status(200).json({
        message: "GET All Users",
        data: data        
    });

    }catch(error){
        res.status(500).json({
            message: "Error retrieving users",
    
            error: error
        })

    }

    
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({
            message: "Bad Request",
            error: "Email and Password are required",
            data: null
        });
    }

    try {
        // cari user by email
        const [rows] = await UserModel.getUserbyEmail(email);
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Login Failed",
                error: "Invalid email or password",
                data: null
            });
        }

        const user = rows[0];

        // cek password hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Login Failed",
                error: "Invalid email or password",
                data: null
            });
        }

        // sukses login
        res.status(200).json({
            message: "Login SUCCESS",
            data: {
                id_users: user.id_users,
                name: user.name,
                email: user.email,
                address: user.address
                // password sengaja jangan dikirim
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error login user",
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
    const { name, email, address, password } = req.body;

    // Validasi input
    if (!name || !email || !address || !password) {
        return res.status(400).json({
            message: "Bad Request",
            error: "Name, Email, Address, and Password are required",
            data: null
        });
    }

    try {

         // hash password sebelum simpan
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.createUser({ name, email, address, password: hashedPassword });

        res.status(201).json({
            message: "POST Users SUCCESS",
            data: { name, email, address, password: hashedPassword }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving users",
            error: error.message
        });
    }
}


const updateUser = async (req, res) => {
    const {id_user} = req.params;
    const {body} = req;

    try{

        await UserModel.updateUser(body, id_user);

        res.status(201).json({
        message: "UPDATE Users SUCCESS",
        data: {
            id: id_user,
            ...body
        }
    });

    }catch(error){

         res.status(500).json({
            message: "Error saving users",
    
            error: error
        })

    }

    
}

const deleteUser = async (req, res) => {
    const {id_user} = req.params;
    
    try{

        await UserModel.deleteUser(id_user);

        res.status(200).json({
            message: `DELETE Users ID: ${id_user} SUCCESS`,
            data: null
        });

    }catch(error){

        res.status(500).json({
            message: "Error delete users",
    
            error: error
        })
        
    }

    
}

module.exports = {
    loginUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
