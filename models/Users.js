'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [bookSchema]
});

// Models consume schemas
const BookModel = mongoose.model('user', userSchema);

module.exports = BookModel;