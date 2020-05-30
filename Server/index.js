//Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// CORS
const cors = require('cors')

mongoose.connect('mongodb://localhost/auth',{ useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true })
.then((db) => console.log('Connected to Database'))
.catch((err) => console.log('Unable to connect database',err));

//App setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))

//cors is used by app
app.use(cors())

//export app to router function 
router(app)

//server setup
const PORT = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(PORT)
console.log('Server listening in PORT:', PORT)