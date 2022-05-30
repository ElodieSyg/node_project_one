const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env',
});
const mongoose = require('mongoose');
const port = 3001
const app = express();
// Middleware
const ignoreFavicon = require('./middlewares/ignoreFavicon');

// MongoDB connection
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to MongoDB !");
    })
    .catch(err => {
        console.log("Database connection failed");
        console.log(err);
        process.exit;
    });

app.set('view engine', 'ejs')

// Middlewares
app.use(ignoreFavicon);
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(('/public'), express.static('public'));



// Routes
app.use('/myArticles', require('./routes/my_articles'));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/user', require('./routes/users'));
app.use('/', require('./routes/articles'));

app.listen(port, () => {
    console.log(`Server started, listening on port ${port}`)
})

module.exports = app;
