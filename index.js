const express = require('express');
const indexController = require('./controllers/indexController');
const indexRouter = require('./routers/index')

const app = express();

app.use('/', indexRouter);

app.listen('3000',() => {
    console.log('server has been started')})
