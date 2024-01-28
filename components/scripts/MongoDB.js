// Correct import statement for MongoClient
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://AnkitKale:pRPGMjyGwARTB1NZ@cluster0.83b1sf2.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'VoyageurDB';

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');
    const database = client.db(dbName);
    return database;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
};
