const Users = require('../models/users.models')

exports.getAllUsers = (req,res)=>{
    try{
        Users.find().then((data)=>{
            res.status(200).send({message:'Users have been retrieved successfully.', data: data})
        }).catch((error)=>{
            res.status(400).send({message:"Error while retrieving users."})
        })
    }catch(error){
        res.status(500).send({message:'Internal Server Error.'})
    }
}

exports.getUserById = (req,res)=>{
    try{
        Users.findById(req.params.userId).then((data)=>{
            if(!data){
            return res.status(200).send({message:'No user found with the given id'})
            }
            res.status(200).send({message:'User have been retrieved successfully.', data: data})
        }).catch((error)=>{
            res.status(400).send({message:"Error while retrieving user."})
        })
    }catch(error){
        res.status(500).send({message:'Internal Server Error.'})
    }
}