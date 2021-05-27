'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

// CRUD actions imported here
const Book = require('./modules/books.js');
const BookModel = require('./models/Users.js');
const { response } = require('express');

const PORT = process.env.PORT || 3001;

// DataBase initial connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Variable to refer to database connection
const db = mongoose.connection;

// Constantly checking for errors on database
db.on('error', (error) => console.error(error))

// When database initializes:
db.once('open', () => {
  app.listen(PORT, () => console.log(`Server up, listening on ${PORT}`));
  console.log('Connected to Database');

  // BookModel.find({})
  //   .then(results => {
  //     console.log(results);
  //     if (results.length === 0) {
  //       const FirstBook = new BookModel({ name: 'Default', title: 'First Book', author: 'Author' });
  //       FirstBook.save();
  //     }
  //   })
});

// Routes
app.get('/books', Book.getAllBooks);
app.post('/books', Book.addABook);
app.delete('/books/:index', Book.deleteABook);
