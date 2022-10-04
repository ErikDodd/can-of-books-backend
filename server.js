'use strict';

// Requirements
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Connect Mongoose
const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Mongoose
mongoose.connect(process.env.DB_URL); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.once('open', function() {
  console.log('Mongoose is connected to mongo');
});

const Books = require('./models/book.js');


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// Endpoints

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/book', getBooks);

async function getBooks(req,res) {
  try {
    const results = await Books.find();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

