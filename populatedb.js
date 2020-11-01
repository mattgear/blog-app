// This script populates test objects to mongodb
// Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true

const userArgs = process.argv.slice(2);

const async = require('async'),
    