const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

dotenv.config({path : './config/config.env'});

//Connecting to MongoDB
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Middleware Body Parser
app.use(express.json());

//Mount Router
app.use('/api/bootcamps', bootcamps);

//Error Handler Middleware
app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} PORT`);
});

// Handling unhandled exceptions
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    server.close(() => process.exit(1));
});