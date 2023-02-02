const mongoose = require('mongoose');
const config = require ('../config/database');

const GenreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

GenreSchema.virtual('booksInGenre', {
   ref: 'Book', 
   localField: '_id', 
   foreignField: 'genres',
});

GenreSchema.set('toObject', { virtuals: true });
GenreSchema.set('toJSON', { virtuals: true });

const Genre = module.exports = mongoose.model('Genre', GenreSchema);

module.exports.getGenres = function(callback) {
	Genre.find(callback).populate({ 
		path: 'booksInGenre',
		select: 'title author description year ISBN publisher ratings reviews avgRating'
	});
}