const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Users = require('../models/users.models')

router.post('/register', async (req,res)=>{
    try{
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: 'Password is mandatory!'})
        };
        const hashedValue = await bcrypt.hash(payload.password, 12); //Hashing

        payload.hashedPassword = hashedValue;
        delete payload.password;

        const newUser = new Users(payload);

        newUser.save().then(data => {
            res.status(201).send({message: 'User registration successfull.', userId: data._id});
        }).catch((error) => {
            res.status(400).send({message: "Error while registering user"});
        })
    }catch(error){
        res.status(500).send({message:'Internal Server Error.'})
    }
});

router.post('/signin', async (req,res)=>{
    try{
        const { email, password } = req.body;
        const existingUser = await Users.findOne({email: email});

        if(existingUser){
            const isValidUser = await bcrypt.compare(password, existingUser.hashedPassword);

            if(isValidUser){
                const token = await jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY); //Encryption
                res.cookie('accessToken', token, {expire: new Date() + 86400000});

                return res.status(200).send({message: 'User signed-in successfully.'});
            }

            return res.status(400).send({message: 'Invalid credentials.'})
        }

        return res.status(404).send({message: "User doesn't exist."});
        
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
});


router.get('/signout', async (req,res)=>{
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'User signed-out!'});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
});

router.post('/forgot-password',(req,res)=>{
    
});

router.post('/reset-password',(req,res)=>{
    
});

module.exports = router;