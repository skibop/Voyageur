/*
  The App class initializes and configures an Express.js server to handle various routes and requests.
*/

// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config({ path: './components/key.env' });

class App {
  constructor() {
    // Initialize Express app
    this.app = express();
    // Set port for the server
    this.port = process.env.PORT || 80 || 8080;
    // Set session secret from environment variables
    this.sessionSecret = process.env.SECRET;
    // Set MongoDB database name
    this.dbName = 'VoyageurDB';
    // Set MongoDB URI from environment variables
    this.uri = process.env.MONGO_URI;

    // Setup middleware for the Express app
    this.setupMiddleware();
    // Setup routes for the Express app
    this.setupRoutes();
  }

  // Configure middleware for the Express app
  setupMiddleware() {
    // Serve static files from the 'components' directory
    this.app.use(express.static(path.join(__dirname, 'components'), {
      // Set headers to allow CORS
      setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*');
      }
    }));

    // Parse incoming request bodies in JSON format
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Configure session handling middleware
    this.app.use(session({
      secret: this.sessionSecret,
      resave: false,
      saveUninitialized: true,
    }));
  }

  // Setup routes for the Express app
  async setupRoutes() {
    // Define routes for login, profile, and user data retrieval
    this.app.get('/login', (req, res) => this.handleLoginPage(req, res));
    this.app.post('/login', (req, res) => this.handleLoginRequest(req, res));
    this.app.get('/profile', (req, res) => this.handleProfilePage(req, res));
    this.app.get('/get-user-data', (req, res) => this.handleGetUserData(req, res));
  }

  // Handler for serving the login page
  async handleLoginPage(req, res) {
    res.sendFile(path.join(__dirname, 'components', 'login', 'login.html'));
  }

  // Handler for processing login requests
  async handleLoginRequest(req, res) {
    const client = new MongoClient(this.uri);
    try {
      await client.connect();
      const user = await client.db(this.dbName)
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
  }

  // Handler for serving the profile page
  async handleProfilePage(req, res) {
    req.session.user ? res.sendFile(path.join(__dirname, 'components', 'index.html')) : res.redirect('/login');
  }

  // Handler for retrieving user data
  async handleGetUserData(req, res) {
    req.session.user ? res.json(req.session.user) : res.status(401).send('Not logged in');
  }

  // Start the Express server
  start() {
    this.app.listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}/login`));
  }
}

// Create an instance of the App class and start the server
const app = new App();
app.start();
