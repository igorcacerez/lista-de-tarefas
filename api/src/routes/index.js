var bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    // parse requests of content-type - application/json
    app.use(express.json()); 
    app.use(cors({
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        origin: '*'
    }));

    // define a simple route
    app.get('/', async (req, res) => {
        res.send("Hello World");
    });

    // Require the routes
    app.use('/usuario', require('./usuario'));
};