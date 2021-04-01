const express = require('express');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb://localhost:27017/botw'

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store})
);
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
