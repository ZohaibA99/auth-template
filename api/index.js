const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');

dotenv.config();

mongoose.connect(process.env.DB_HOST)
    .then(() => console.log(`connected to mongodb database`))
    .catch(error => console.log(error));


const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log(`server listening on port 3000`)
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)