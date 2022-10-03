'use strict';

// Requirements
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Connect Mongoose
// const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Mongoose
// mongoose.connect(process.env.DB_URL); 
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Mongo connection error'));
// db.once('open', function() {
  // console.log('Mongoose is connected to mongo');
// });


const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
