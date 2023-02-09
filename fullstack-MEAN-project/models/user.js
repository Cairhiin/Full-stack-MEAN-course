const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique : true,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	role: {
		type: String,
		default: 'user'
	},
	ratings: [
		{
			book: {
				type: mongoose.Schema.Types.ObjectId, ref: 'Book' 
			},
			rating: {
				type: Number
			},
			date: {
				type: Date
			}
		}
	],
	reviews: [
		{
			book: {
				type: mongoose.Schema.Types.ObjectId, ref: 'Book' 
			},
			review: {
				type: String
			},
			date: {
				type: Date
			}
		}
	],
	reading: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Book'
	}
}, {
	timestamps: true
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUsers = function(callback) {
	User.find({}, callback);
}

// Password exclusion: https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu
module.exports.getUserById = function(id, callback) {
	User.findById(id, {})
		.select('+password')
		.populate({ path: 'reading', model: 'Book'})
		.populate({ path: 'ratings.book', model: 'Book' })
		.exec(callback);
}

module.exports.getUserByUsername = function(username, callback) {
	const query = { username: username };
	User.findOne(query, {})
		.select('+password')
		.populate({ path: 'reading', model: 'Book'})
		.populate({ path: 'ratings.book', model: 'Book' })
		.exec(callback);
}

module.exports.addUser = function(user, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) throw err;
			user.password = hash;
			user.save(callback);
		});
	});
}

module.exports.updateUser = function(id, user, callback) {
	User.findOneAndUpdate({ _id: id }, user, { new: true, populate: 'ratings.book reading' }, callback);
}

module.exports.deleteUser = function(id, callback) {
	User.deleteOne({ _id: id }, callback);
}

module.exports.getUsersByBookId = function(id, callback) {
	User.find({'ratings.book': id }).populate('ratings.book').exec(callback);
}

module.exports.comparePassword = function(candidatePassword, hashedPassword, callback) {
	bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
}