const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    members:{
        type: String,
        required: true
    }
})

module.exports =  Conversation = mongoose.model("conversations", conversationSchema)