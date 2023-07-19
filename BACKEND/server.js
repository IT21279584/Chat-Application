const mogoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const io = require('socket.io')(8090, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

const Users = require('./models/User')

//import router
const user = require('./routes/users')
const conversations = require('./routes/conversations')
const messages = require('./routes/messages')
    
//bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)
app.use(bodyParser.json())
app.use(cors())

//receive json format data
app.use(express.json())

//DB config
const db = require('./config/database').mongoURI

//connect database
mogoose.connect(
    db,
   {useNewUrlParser: true} 
)
.then(()=>console.log("Mongodb connected successfully!"))
.catch(error => console.log(error))

const port = process.env.PORT || 8050
app.listen(port, () => console.log(`Server up and running on port ${port}!`))

//routes 
app.use('/users', user) 
app.use('/conversations', conversations)
app.use('/messages', messages) 



// Socket.io
let users = [];
io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);
        console.log('sender :>> ', sender, receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, fullName: user.fullName, email: user.email }
            });
            }else {
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    user: { id: user._id, fullName: user.fullName, email: user.email }
                });
            }
        });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
    // io.emit('getUsers', socket.userId);
});