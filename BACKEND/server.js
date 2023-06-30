const mogoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

//import router
const users = require('./routes/users')
const conversations = require('./models/Conversation')

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
app.use('/users', users) 
app.use('/conversations', conversations) 