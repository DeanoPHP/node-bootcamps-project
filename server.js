const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const colours = require('colours');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const bootcamps = require('./routes/bootcamps');

// This enables us to use localhost on server side and localhost on different port to connect to backend
const cors = require('cors');

// init express variable
const app = express();

// Body parser
app.use(express.json());

app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'show all bootcamps'
    });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold));

//  Handle unhand;e promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}.red`);
    // Close the server and exit process
    server.close(() => process.exit(1));
});

