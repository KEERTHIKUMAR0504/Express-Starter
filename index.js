require('dotenv').config();
const express = require('express');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const db = require('./db/connect')
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(cookieparser());

db();

app.use(userRoutes);
app.use(productRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})