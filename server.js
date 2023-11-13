const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colours = require('colours');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

// init express variable
const app = express();

// Body parser
app.use(express.json());

// Add cookie-parser middleware
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// fileupload
app.use(fileupload());

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

// very important its called before above as middleware runs in a linear.
app.use(errorHandler);

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

