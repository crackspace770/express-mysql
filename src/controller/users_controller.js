const UserModel = require('../models/users_model.js');

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

const createUser = async (req, res) => {
   
    const {body} = req;

   if (!body.name || !body.email || !body.address) {
    return res.status(400).json({
        message: "Bad Request",
        error: "Name, Email, and Address are required",
        data: null
    });
}


    try{

        await UserModel.createUser(body);

        res.status(201).json({
        message: "POST Users SUCCESS",
        data: body
    });

    }catch(error) {
            res.status(500).json({
            message: "Error saving users",
    
            error: error
        })


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
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
