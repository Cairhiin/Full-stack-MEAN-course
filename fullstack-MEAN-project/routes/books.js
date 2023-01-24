const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Book = require('../models/book');

router.get('/', (req, res, next) => {

});

router.get('/:id', (req, res, next) => {
	
});

module.exports = router;