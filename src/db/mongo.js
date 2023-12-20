import { connect } from "./db"; // replace './db' with the actual path to the db.js file

export async function createList(newListing) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
  return result;
}

createList({
  name: "My List",
  owner: "My Owner",
  items: [],
  dueDate: "2021-10-10",
  guildId: "1234567890",
});
