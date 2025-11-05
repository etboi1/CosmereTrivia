require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/db.js');
const questions = require('./quizQuestions.js');

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

// Set and helper functions for... 
// 1. Storing used questions
// 2. Randomly selecting an unused question
let usedQuestions = new Set();

function getRandomQuestion() {
  const available = questions.filter(q => !usedQuestions.has(q.id));
  if (available.length === 0) {
    usedQuestions.clear(); // reset if all questions have been used **FIX THIS LATER**
    return getRandomQuestion();
  }

  const randomQuestion = available[Math.floor(Math.random() * available.lentgth)];
  usedQuestions.add(randomQuestion.id);
  return randomQuestion;
}

// Example route (queries DB)
app.get('/', async (req, res) => res.render('index', { title: 'Cosmere Trivia Quiz - Welcome!'}));
app.get('/quiz', async (req, res) => {
  try {
    const questionObject = getRandomQuestion();
    const [correctRows] = await db.raw(questionObject.correctQuery);
    const [wrongRows] = await db.raw(questionObject.wrongQuery);
    
    const correct = correctRows[0]?.answer;
    const options = [correct, ...wrongRows.map(r => r.answer)];

    // Shuffle the options so correct answer isn't always first
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    res.json({
      question: questionObject.question,
      options,
      answer: correct
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching question");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
