const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports =  Message = mongoose.model("messages", messageSchema)