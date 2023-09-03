const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =require('dotenv');

dotenv.config({path:'./config.env'});

const PORT=process.env.PORT;
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));
// const User=require('./model/userSchema');
// Middleware
const middleware = (req, res, next) => {
  console.log('Hello world');
  next();
};

app.use(express.json()); // Middleware to parse JSON requests

app.get('/', (req, res) => {
  res.send('Hello world from server');
});

app.get('/about', middleware, (req, res) => {
  console.log('kaise hao aap log');
  res.send('Hello world from about');
});

app.get('/contact', (req, res) => {
  res.send('Hello world from contact');
});

app.get('/signin', (req, res) => {
  res.send('Hello world from signin');
});

app.get('/signup', (req, res) => {
  res.send('Hello world from signup');
});


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
