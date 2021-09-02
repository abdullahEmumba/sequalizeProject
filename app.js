const express = require('express')
var cors = require('cors')

//import routers
const userRouter = require('./src/routes/user')

//initialize express and it's ports
const app = express()
const port = 3010

//JSON handling
app.use(express.json())

//Route handling
app.use('/user',userRouter)

//Listen Port
app.listen(port, () => {
    console.log('Server running at port ' + port)
})