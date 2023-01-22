const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config/database');
const users = require('./routes/users');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log(`Connected to the database ${config.database}!`);
});
mongoose.connection.on('error', (err) => {
	console.log(`Databse error: ${err}!`);
});

const app = express();

const port = process.env.PORT | 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({ 
	secret: config.secret,
  	resave: false,
  	saveUninitialized: true,
  	cookie: { secure: true } 
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
	console.log(`Server started on port ${port}!`);
});