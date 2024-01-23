require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/users.routes')
const app = express();
const db = require('./db/connect')

app.use(express.json());

db();

app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})