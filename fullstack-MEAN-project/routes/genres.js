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
			res.json({ success: true, users: genres });
		}
	});
});

module.exports = router;