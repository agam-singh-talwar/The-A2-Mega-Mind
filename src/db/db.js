// db.js
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@senecaweb.grvntlm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connect() {
  try {
    if (!(client.topology && client.topology.isConnected())) {
      await client.connect();
    }

    const db = client.db("A2_Bot");
    await db.command({ ping: 1 });
    return client;
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
}

module.exports = { connect };
