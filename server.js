require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/db.js');

const app = express();
const PORT = process.env.PORT || 3000;

//Serve static files from 'public
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Example route (queries DB)
app.get('/', async (req, res) => res.render('index', { title: 'Cosmere Trivia Quiz - Welcome!'}));
app.get('/quiz', (req, res) => res.render('quiz', { title: 'Cosmere Trivia Quiz - Take Quiz'}));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
