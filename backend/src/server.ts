require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/wishlists.ts')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error: any) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json())


app.use('/api', router)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server Started"))