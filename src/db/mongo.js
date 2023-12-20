import 'dotenv/config';
import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@senecaweb.grvntlm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("A2_Bot");
    // Create a new collection named "A2 Bot"
    const collection = db.collection("Lists");

    // Insert a document into the new collection
    const result = await collection.insertOne({ test: "test" });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);
