// Import required modules
const express = require('express'); // Import the Express framework
const { MongoClient } = require('mongodb'); // Import the MongoDB client
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const path = require('path'); // Utility for working with file and directory paths
const session = require('express-session'); // Middleware for session management
require('dotenv').config({ path: './components/key.env' }); // Load environment variables from a file

// Initialize Express app
const app = express(); // Create an instance of Express

// Middleware
// Serve static files from the 'components' directory
app.use(express.static(path.join(__dirname, 'components')));
// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configure session management
app.use(session({
  secret: process.env.SECRET, // Secret key used for session encryption
  resave: false,
  saveUninitialized: true,
}));

// Database configuration
const uri = process.env.MONGO_URI; // MongoDB connection URI
const dbName = 'VoyageurDB'; // Name of the MongoDB database

// Routes
// Route for serving the login page
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'components', 'login', 'login.html')));

// Route for handling login requests
app.post('/login', async (req, res) => {
  // Create a new MongoDB client
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB database
    await client.connect();
    // Find a user in the 'Login-Information' collection matching the provided credentials
    const user = await client.db(dbName)
      .collection('Login-Information')
      .findOne(req.body);
    // If a user is found, set the user session and redirect to the profile page
    if (user) {
      req.session.user = user;
      res.redirect('/profile');
    } else {
      // If no user is found, return a 401 Unauthorized status
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    // Handle errors while connecting to the database
    console.error('Error connecting to the database:', error.message);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB client
    await client.close();
  }
});

// Route for serving the profile page
app.get('/profile', (req, res) => req.session.user ? res.sendFile(path.join(__dirname, 'components', 'index.html')) : res.redirect('/login'));

// Route for getting user data
app.get('/get-user-data', (req, res) => req.session.user ? res.json(req.session.user) : res.status(401).send('Not logged in'));

// Start server
const port = process.env.PORT; // Port number from environment variables
app.listen(port, () => console.log(`Server is running on http://localhost:${port}/login`)); // Start the Express server and log the URL