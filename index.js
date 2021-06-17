const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path : './config/config.env'});

//Connecting to MongoDB
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Mount Router
app.use('/api/bootcamps', bootcamps);

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} PORT`);
});

// Handling unhandled exceptions
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    server.close(() => process.exit(1));
});