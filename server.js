require('dotenv').config({ path: 'key.env' });
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI
const dbName = 'VoyageurDB';

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    const database = client.db(dbName);
    const collection = database.collection('Login-Information');

    const { username, password } = req.body;

    // Check if the username and password match in the database
    const user = await collection.findOne({ username, password });

    if (user) {
      // Redirect to index.html
      res.redirect('/index.html');
    } else {
      res.sendFile(__dirname + '/components/failure.html');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});