// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config({ path: './components/key.env' });

// Initialize Express app
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'components')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Database configuration
const uri = process.env.MONGO_URI;
const dbName = 'VoyageurDB';

// Routes
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'components', 'login', 'login.html')));

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const user = await client.db(dbName)
      .collection('Login-Information')
      .findOne(req.body);
    if (user) {
      req.session.user = user;
      res.redirect('/profile');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/profile', (req, res) => req.session.user ? res.sendFile(path.join(__dirname, 'components', 'index.html')) : res.redirect('/login'));

app.get('/get-user-data', (req, res) => req.session.user ? res.json(req.session.user) : res.status(401).send('Not logged in'));

// Start server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}/login`));