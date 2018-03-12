require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

const { diveRouter } = require('./routes');
const port = process.env.SERVER_PORT;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/dives', diveRouter);
app.use(errorHandler());

app.listen(port, () => console.log(`Server is running at the port ${port}`));