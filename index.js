const express = require('express');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser')
const MONGODB_URI = 'mongodb://localhost:27017/botw'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

mongoose
    .connect(MONGODB_URI,  {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(result => {app.listen('3000',() => {
        console.log('server has been started')});})
    .catch(err => {
        console.log(err);
    });
