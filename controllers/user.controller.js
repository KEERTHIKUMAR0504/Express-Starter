const Users = require('../models/users.model')

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
};

exports.getUserById = async (req,res)=>{
    try{
        let isAdmin = await Users.findOne({_id:req.id});

        if(req.id !== req.params.userId && isAdmin.role !== 1){
            return res.status(401).send({message: 'Action cannot be done!'})
        }
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
};

exports.updateUser = (req, res) => {
    try{
        if(req.id !== req.params.userId){
            return res.status(401).send({message: 'Action cannot be done!'})
        }
        Users.findByIdAndUpdate({_id: req.params.userId}, {$set: req.body}).then((data) => {
            res.status(200).send({message: 'User has been updated successfully.', userId: data._id});
        }).catch(error => {
            res.status(400).send({message: 'Error while updating user.'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
};


exports.deleteUser = (req, res) => {
    try {
        if(req.id !== req.params.userId){
            return res.status(401).send({message: 'Action cannot be performed.'})
        }
        Users.deleteOne({ _id: req.params.userId }).then(data => {
            res.clearCookie('accessToken');
            res.status(200).send({ message: 'User has been deleted successfully.' });
        }).catch(error => {
            res.status(400).send({ message: 'Error while deleting user.' });
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};