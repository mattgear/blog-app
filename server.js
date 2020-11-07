// dotenv file
require("dotenv").config({ path: ".env"});

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Set port to env variable or 5000
const port = process.env.PORT || 5000;

// Middleware to print incoming requests to server console
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure CORs middleware
app.use(cors());

// Configure routes
const api = require('./routes/routes');
app.use('/api/v1', api);

const authRoute = require('./routes/auth');
app.use(express.json());
app.use("/auth/", authRoute);

// Middleware to serve compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/builld', 'index.html'));
    });
};

// Config server to listen on port
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

// Connect to mongoose
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongo database"))
    .catch((e) => console.error(e));