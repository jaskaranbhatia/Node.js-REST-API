const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

dotenv.config({path : './config/config.env'});

//Connecting to MongoDB
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/course');
const auth = require('./routes/auth');

const app = express();

//Middleware Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Mount Router
app.use('/api/bootcamps', bootcamps);
app.use('/api/auth', auth);
app.use('/api/course', courses)

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