const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_HOST)
    .then(() => console.log(`connected to mongodb database`))
    .catch(error => console.log(error));


const app = express();

app.listen(3000, () => {
    console.log(`server listening on port 3000`)
})