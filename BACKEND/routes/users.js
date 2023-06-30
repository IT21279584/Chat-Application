const express = require('express')
const Users = require('../models/User')
const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken');

//Control of the requests startimg with path
const router = express.Router();

router.post('/api/register', async(req, res, next)=>{
    try{

        const {name, email, password} = req.body

        if(!name || !email || !password){
            res.status(400).send("Please fill out all fields")
        }else{
            const isAlreadyExits = await Users.findOne({ email })
            
            if(isAlreadyExits){
                res.status(400).send("User already exiSts")
            }else{
                const newUser = new Users({name, email})
                bcryptjs.hash(password, 10, (error, hashPassword)=>{
                    newUser.set('password', hashPassword)
                    newUser.save()
                    next()
                })
                return res.status(200).send("User registered successfully")
            }
        }

    }catch(error){
        
    }
})

router.post('/api/login', async (req, res, next)=>{
    try{

        const {email, password} = req.body

        if(!email || !password){
            res.status(400).send("Please fill out all fields")
        }else{
            const user = await Users.findOne({email})
            if(!user){
                res.status(400).send("User email or password incorrect")
            }else{
                const validateUser = await bcryptjs.compare(password, user.password)
                if(!validateUser){
                    res.status(400).send("User email or password incorrect")
                }else{
                    const payload = {
                        userId : user._id,
                        email:user.email

                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECET_KEY';
                    
                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '24h'}, async(error, token)=>{
                        await Users.updateOne({_id:user._id}, {
                            $set: {token}
                        })
                        user.save()
                        next()
                        
                    
                    })

                    
                    return res.status(200).json({user:{email: user.email, name:user.name}, token:user.token})
                }
            }
        }

    }catch(error){
        console.log(error, "Error")
    }
})


module.exports = router;