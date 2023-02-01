const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Book = require('../models/book');
const checkIsInRole = require('../config/utils');

router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to register user!' });
		} else {
			res.json({ success: true, msg: 'User registered.'});
		}
	});
});

router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User not found!' });
		} 

		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign({data: user}, config.secret, {
					expiresIn: 604800
				});

				return res.json({ 
					success: true, 
					token: token,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email,
						role: user.role, 
						ratings: user.ratings,
						reviews: user.reviews,
						reading: user.reading
					}, 
					msg: 'User logged in successfully!'
				});
			} else {				
				return res.json({ sucess: false, msg: 'Wrong password!' });
			}
		})
	}); 
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.json(req.user);
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	User.getUsers((err, users) => {
		if (err) {
			res.json({ success: false, msg: 'No users found!' });
		} else {
			res.json({ success: true, users: users });
		}
	});
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	const id = req.params.id;
	const user = req.body;

	/* 
	Update a user after it has been retrieved
	by its unique id
	*/
	User.updateUser(id, user, (err, user) => {
		if (err) {
			res.json({ success: false, msg: `Failed to update user with id: ${id}!` });
		} else {
			res.json({ success: true, user: user });
		}
	});
});

router.put('/:id/book/:bid', 
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	const id = req.params.id;
	const bid = req.params.bid;
	const { book, user } = req.body;

	/* 
	Update a user after it has been retrieved
	by its unique id and if successful update
	the book rating as well
	*/
	User.updateUser(id, user, (err, user) => {
		if (err) {
			res.json({ success: false, msg: `Failed to update user with id: ${id}!` });
		} else {
			Book.updateBook(bid, book, (err, book) => {
				if (err) {
					res.json({ success: false, msg: `Failed to update book with id: ${bid}!` });
				} else {
					res.json({ success: true, user: user, book: book });
				}
			});	
		}
	});
});

/*
Protect route also on backend, only admin
can delete users
*/
router.delete('/:id', 
	passport.authenticate('jwt', { session: false }), 
	checkIsInRole('admin'),
	(req, res, next) => {
	const id = req.params.id;
	User.deleteUser(id, (err, user) => {
		if (err || user.deletedCount === 0) {
			res.json({ success: false, msg: `Failed to delete user with id ${id}!` });
		} else {
			res.json({ success: true });
		}
	});
});
module.exports = router;