'use strict'
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 8080

const mongoUri = `mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/glode-users`

app.use(bodyParser.json())
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/lamp', require('./routes/lamp.routes.js'))

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
       
        app.listen(port, () => {
            console.log(`Example app listening at port: ${port}`)
        }) 
    } catch (e) {
        console.log(`Server Error`, e.message)
        process.exit(1)
    }     
}

start()