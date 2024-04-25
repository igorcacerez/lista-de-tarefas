require('dotenv').config();
const express = require('express');
const app = express();

const routes = require('./src/routes');
routes(app);

module.exports = app;