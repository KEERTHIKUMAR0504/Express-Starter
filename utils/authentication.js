const jwt = require('jsonwebtoken');

exports.isAuth = (req,res,next)=>{
    const {cookies} = req;
    
    if(cookies.accessToken){
        let user = jwt.verify(cookies.accessToken, process.env.SECRET_KEY);
        req.id = user._id;

        if(!req.id){
            res.status(401).send({message:'Not Authorized!'})
        }
        return next();
    }
    res.status(401).send({message:'Not Authorized!'})
};