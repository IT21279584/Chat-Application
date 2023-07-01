const Conversation = require('../models/Conversation')
const Users = require('../models/User')
const express = require('express')
const router = express.Router()

router.post('/api/conversation', async(req, res)=>{
    try{

        const {senderId, receiverId} = req.body;
        const newConversation = new Conversation({members:{senderId, receiverId}})
        await newConversation.save()
        
        res.status(200).send("Conversation created successfully")

    }catch(error){
        console.log(error, 'Error')
    }
})

router.get('/api/conversation/:userId', async(req, res)=>{
    try{

        const userId = req.params.userId
        const conversation = await Conversation.find({memebers:{$in:[userId]}})
        const conversationUserData = Promise.all(conversation.map(async(conversation)=>{
            const receiverId = await conversation.memebers.find((member)=>member !== userId)
            const user =  await Users.findById(receiverId)
            return {user:{email: user.email, name: user.name}, conversation:conversation._id}
        }))
        res.status(200).json(await conversationUserData)

    }catch(error){
        console.log(error, 'Error')
    }
})
module.exports = router;