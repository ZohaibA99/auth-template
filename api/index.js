const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const { json } = require('express');
const cors = require('cors')

const corsOptions = 
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    }

dotenv.config();

//connect to database
mongoose.connect(process.env.DB_HOST)
    .then(() => console.log(`connected to mongodb database`))
    .catch(error => console.log(error));


//initiate server
const app = express();
app.use(cors());

app.use(express.json())

app.listen(3000, () => {
    console.log(`server listening on port 3000`)
})

//create api routes for the user and authentication
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.get('/', (req, res, next) => {
    res.json({ message: 'CORS is activated' });
  });
  
//middleware for our server simple error handling
//call next(error) in the controller to use this middle ware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal sever error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})