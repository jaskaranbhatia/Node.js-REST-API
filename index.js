const express = require('express');
const dotenv = require('dotenv')

dotenv.config({path : './config/config.env'});

//Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Mount Router
app.use('/api/bootcamps', bootcamps);

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} PORT`);
});