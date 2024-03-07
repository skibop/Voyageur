// Import required modules
const express = require('express'); 
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config({ path: './components/key.env' });

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 80 || 8080;
    this.sessionSecret = process.env.SECRET;
    this.dbName = 'VoyageurDB';
    this.uri = process.env.MONGO_URI;

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.static(path.join(__dirname, 'components'), {
      setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*');
      }
    }));

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(session({
      secret: this.sessionSecret,
      resave: false,
      saveUninitialized: true,
    }));
  }

  async setupRoutes() {
    this.app.get('/login', (req, res) => this.handleLoginPage(req, res));
    this.app.post('/login', (req, res) => this.handleLoginRequest(req, res));
    this.app.get('/profile', (req, res) => this.handleProfilePage(req, res));
    this.app.get('/get-user-data', (req, res) => this.handleGetUserData(req, res));
  }

  async handleLoginPage(req, res) {
    res.sendFile(path.join(__dirname, 'components', 'login', 'login.html'));
  }

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

  async handleProfilePage(req, res) {
    req.session.user ? res.sendFile(path.join(__dirname, 'components', 'index.html')) : res.redirect('/login');
  }

  async handleGetUserData(req, res) {
    req.session.user ? res.json(req.session.user) : res.status(401).send('Not logged in');
  }

  start() {
    this.app.listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}/login`));
  }
}

const app = new App();
app.start();
