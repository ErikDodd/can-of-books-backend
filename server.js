'use strict';

// Requirements
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Connect Mongoose
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

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

// Post Endpoint
app.post('/book', postBooks);

async function postBooks(req, res, next) {
  console.log(req.body);
  try {
    const newBook = await Books.create(req.body);
    res.status(201).send(newBook);
  } catch (error) {
    next(error);
  }
}

// Delete Endpoint
app.delete('/book/:id', deleteBook)

async function deleteBook(req, res, next) {
  const id = req.params._id;
  console.log(id);
  try {
    await Books.findByIdAndDelete(id);
    res.status(204).send('Succesfully Deleted Book');
  } catch (error) {
    next(error);
  }
}

app.put('/book/:id', putBook)

async function putBook(req, res, next) {
  const id = req.params.id;
  console.log(id);
  try {
    const data = req.body;
    const options = {
      new: true,
      overwrite: true,
    };
    const updatedBook = await Books.findByIdAndUpdate(id, data, options);
    res.status(201).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not available');
});

app.use((error, req, res) => {
  res.status(500).send(error.message);
})
