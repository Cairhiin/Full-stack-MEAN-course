const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config/database');
const users = require('./routes/users');
const books = require('./routes/books');
const genres = require('./routes/genres');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config({path: __dirname + '/.env'})

mongoose.set('strictQuery', false);

if (!process.env['DATABASE_PASSWORD'] || !process.env['DATABASE_USERNAME']) {
    mongoose.connect('mongodb://127.0.0.1:27017/bookrater');
} else {
    mongoose.connect(`mongodb+srv://${process.env['DATABASE_USERNAME']}:${process.env['DATABASE_PASSWORD']}@bookapp.chr5jzc.mongodb.net/?retryWrites=true&w=majority`);
}

mongoose.connection.on('connected', () => {
	console.log(`Connected to the database!`);
});
mongoose.connection.on('error', (err) => {
	console.log(`Database error: ${err}!`);
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

aws.config.update({
    secretAccessKey: process.env['SECRET_ACCESS_KEY'],
    accessKeyId: process.env['ACCESS_KEY_ID'],
    region: process.env['REGION']
});

const s3 = new aws.S3();
const upload = multer({
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'), false);
        }
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'book-app-bucket',
        key: function (req, file, callback) {
            req.file = Date.now() + file.originalname;
            callback(null, Date.now() + file.originalname);
        }
    })
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/books', books);
app.use('/genres', genres);

app.post('/upload', upload.array('file', 1), (req, res) => {
    res.send({ file: req.file });
});

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, () => {
	console.log(`Server started on port ${port}!`);
});