'use strict';

const BookModel = require('../models/Users.js');
const verifyToken = require('./authentication.js');

const Book = {};

Book.getAllBooks = async function (request, response) {

  // Authentication step
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, findBooks);

  // Callback function
  async function findBooks(user) {
    // console.log(user);
    const name = user.name;
    await BookModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      if (!person.length) {
        person[0] = { name, books: [] }
        const newBookModel = new BookModel(person[0])
        newBookModel.save();
      }
      response.send(person[0].books);
    });
  }
}

// `Book` object method to add a book
Book.addABook = async function (request, response) {

  // Authentication step
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, addBook);

  // Callback function
  async function addBook(user) {
    const name = user.name;
    const { newBook, newBookAuthor } = request.query;
    await BookModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      person[0].books.push({ title: newBook, author: newBookAuthor });
      person[0].save();
      response.send(person[0].books);
    });
  }
}

// `Book` object method to remove a book
Book.deleteABook = async function (request, response) {

  // Authentication step
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, deleteBook);

  // Callback function
  // async function deleteBook
  const index = Number(request.params.index);
  const name = request.query.name;
  await BookModel.find({ name }, (err, person) => {
    if (err) console.error(err);
    const newBookArray = person[0].books.filter((book, i) => i !== index);
    person[0].books = newBookArray;
    person[0].save();
    response.send('Successfully deleted!');
  });
}

module.exports = Book;
