const Users = require('../models/users.model');

exports.isAdmin = async (req, res, next) => {
    const { id } = req;

    const user = await Users.findOne({_id:id});
    
    if(user.role !== 1){
        return res.status(401).send({message:'Admin Resource.Access Denied!'})
    }
    next();
}

exports.isNormalUser = async (req,res,next) => {
    const {id} = req;

    const user = await Users.findOne({_id:id});
    if(user.role !== 2){
        return res.status(401).send({message:'Access Denied!'});
    }
    next();
};