const mongoose = require('mongoose');
const config = require ('../config/database');

const BookSchema = mongoose.Schema({
	author: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	ISBN: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	ratings:{
        type: mongoose.Mixed,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
    default: {1:1, 2:1, 3:1, 4:1, 5:1}
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    image: {
    	type: String,
    default: "/img/default.jpg"
    },
    date: {
    	type: Date
    }
});

const Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.getBookById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.getBookByAuthor = function(author, callback) {
	const query = { author: author };
	User.find(query, callback);
}

module.exports.getBookByISBN = function(ISBN, callback) {
	const query = { ISBN: ISBN };
	User.findOne(query, callback);
}

module.exports.getUserByTitle = function(title, callback) {
	const query = { title: title };
	User.find(query, callback);
}

module.exports.addBook = function(book, callback) {
	book.save(callback);
}

module.exports.updateBook = async function(book, callback) {
	const updateBook = await Book.findById(book.id);
	updateBook = book;
	updateBook.save(callback);
}

module.exports.updateBookRating = async function(id, rating, callback) {
	const updateBook = await Book.findById(id);
	updateBook.ratings.push(rating); 
	updateBook.markModified('ratings');
	updateBook.save(callback);
}