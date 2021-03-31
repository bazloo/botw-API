const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send('here is boulder of the week');
});

app.listen('3030',() => {
    console.log('server has been started')})
