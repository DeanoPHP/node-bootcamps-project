const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colours');
const dotenv = require('dotenv');

// Load dotenv
dotenv.config({ path: './config/config.env' });

// load Models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/bootcamp-docs/devcamper-api/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);

        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// Delete from DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}