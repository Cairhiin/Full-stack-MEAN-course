const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Book = require('../models/book');

router.get('/', (req, res, next) => {
	const queryParams = req.query;

	// Retrieving by ISBN - can only be 1 book
	if (queryParams.ISBN) {
		Book.getBookByISBN(queryParams.ISBN, (err, book) => {
			if (!book) {
				res.json({ success: false, msg: `No books with ISBN ${queryParams.ISBN} found!` });
			} else {
				res.json({ success: true, book: book });
			}
		});
	}

	// Retrieving by Author - can be multiple books
	else if (queryParams.author) {
		Book.getBooksByAuthor(queryParams.author, (err, books) => {
			if (!books.length) {
				res.json({ success: false, msg: `No books from author ${queryParams.author} found!` });
			} else {
				res.json({ success: true, books: books });
			}
		});
	}

	// Retrieving by Title - can be multiple books
	else if (queryParams.title) {
		Book.getBooksByTitle(queryParams.title, (err, books) => {
			if (!books.length) {
				res.json({ success: false, msg: `No books with title ${queryParams.title} found!` });
			} else {
				res.json({ success: true, books: books });
			}
		});
	}

	// Retrieve all books
	else {
		Book.getBooks((err, books) => {
			if (err) throw err;
			if (books.le) {
				res.json({ success: false, msg: 'No books found!' });
			} else {
				res.json({ success: true, books: books });
			}
		});
	}
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	// Retrieve a book by its id
	Book.getBookById(id, (err, book) => {
		if (err) throw err;
		if (!book) {
			res.json({ success: false, msg: `No books found with id: ${id}!` });
		} else {
			res.json({ success: true, book: book });
		}
	});
});

router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const book = req.body;

	// Update a book retrieved by its id
	Book.updateBook(id, book, (err, book) => {
		if (err) {
			res.json({ success: false, msg: `Failed to update book with id: ${id}!` });
		} else {
			res.json({ success: true, book: book });
		}
	});
});

router.post('/', (req, res, next) => {
	const book = new Book(req.body);

	// Add a new book to the database
	Book.addBook(book, (err, book) => {
		if (err) {
			res.json({ success: false, msg: `Failed to add book to database: ${ err._message }!` });
		} else {
			res.json({ success: true, book: book });
		}
	});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;

	// Delete a book by its id
	Book.deleteBook(id, (err, book) => {
		if (err || book.deletedCount === 0) {
			res.json({ success: false, msg: `Failed to delete book with id ${id}!` });
		} else {
			res.json({ success: true });
		}
	});
});

module.exports = router;