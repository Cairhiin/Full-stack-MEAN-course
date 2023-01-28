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
	genres:
		[{ type: String, required: true }],
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

module.exports.getBooks = function(limit = 0, callback) {
	Book.find().limit(limit).exec(callback);
}

module.exports.getBookById = function(id, callback) {
	Book.findById(id, callback);
}

module.exports.getBooksByAuthor = function(author, callback) {
	const query = { author: { $regex: author, $options: "i" }};
	Book.find(query, callback);
}

module.exports.getBooksByTitle = function(title, callback) {
	const query = { title: { $regex: title, $options: "i" }};
	Book.find(query, callback);
}

module.exports.getBookByISBN = function(ISBN, callback) {
	const query = { ISBN: ISBN };
	Book.findOne(query, callback);
}

module.exports.getBooksByDate = function(params, callback) {
	const date = params.date || 'desc';
	const limit = params.limit || 0;
	if (date === 'desc') {
		Book.find().sort({ date: 'desc' }).limit(limit).exec(callback);
	} else {
		Book.find().sort({ date: 'asc' }).limit(limit).exec(callback);
	}	 
}

module.exports.addBook = function(book, callback) {
	book.save(callback);
}

module.exports.updateBook = function(id, book, callback) {
	Book.findOneAndUpdate(id, book, {
		new: true
	}, callback);
}

module.exports.deleteBook = function(id, callback) {
	Book.deleteOne({ _id: id }, callback);
}