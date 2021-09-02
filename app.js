const express = require('express')
var cors = require('cors')

//import routers
const userRouter = require('./src/routes/user')
const todoList = require('./src/routes/todoList')

//initialize express and it's ports
const app = express()
const port = 3010

//Sync Sequelize
const db = require("./src/models");
db.sequelize.sync();

//JSON handling
app.use(express.json())

//Route handling
app.use('/user',userRouter)
app.use('/todoList',todoList)

//Listen Port
app.listen(port, () => {
    console.log('Server running at port ' + port)
})