const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Genre = require('../models/genre');
const checkIsInRole = require('../config/utils');

router.get('/', (req, res, next) => {
	Genre.getGenres((err, genres) => {
		if (err) {
			res.json({ success: false, msg: 'No genres found!' });
		} else {
			res.json({ success: true, genres: genres });
		}
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	/* 
	Retrieve a genre by its id - this can only be one genre
	as identifiers are unique
	*/
	Genre.getGenreById(id, (err, genre) => {
		if (err) throw err;
		if (!genre) {
			res.json({ success: false, msg: `No books found with id: ${id}!` });
		} else {
			res.json({ success: true, genre: genre });
		}
	});
});

module.exports = router;