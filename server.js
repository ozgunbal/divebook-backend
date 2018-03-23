require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

const passport = require('passport');

const { diveRouter, authRouter } = require('./routes');
const port = process.env.PORT || 5000;
const app = express();

/**
 * Passport
 */
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/dives', diveRouter);
app.use('/auth', authRouter)
app.use(errorHandler());

/**
 * Launch
 */
app.listen(port, () => console.log(`Server is running at the port ${port}`));