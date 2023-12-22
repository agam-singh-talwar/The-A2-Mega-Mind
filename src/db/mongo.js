import { connect } from "./db.js"; // replace './db' with the actual path to the db.js file
import ToDoList from "../List.js";
4;
export async function createList(newListing) {
  const client = await connect();
  //  check if the name already exists
  const exists = await checkListName(newListing.name);
  if (exists) {
    console.log("Name already exists");
    return;
  }
  // Check if the collection exists, if not, create it
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
  return result;
}
// Check if the name has already been used
export async function checkListName(name) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOne({ name: name });
  console.log("Name already exists", result);
  return result;
}
// View a specific list
export async function viewAList(listName) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOne({ name: listName });

  console.log("Viewed list", result);

  return result;
}
// View all lists owned by a server
export async function viewAllLists(guildId) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOne({ guildId: guildId });

  console.log("Viewed list", result);

  return result;
}

// Delete a list
export async function deleteList(listName) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .deleteOne({ name: listName });

  console.log("Deleted list", result);

  return result;
}

//  Edit a list's name
export async function editList(listName, newName) {
  const client = await connect();
  // Check if the newName already exists
  const exists = await checkListName(newName);
  if (exists) {
    console.log("Name already exists");
    return;
  }
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .updateOne({ name: listName }, { $set: { name: newName } });

  console.log("Edited list", result);

  return result;
}

// Edit a list's due date
export async function editDueDate(listName, newDueDate) {
  const client = await connect();
  // Check if the passed in date is valid
  const date = new Date(newDueDate);
  if (date == "Invalid Date" || date < Date.now()) {
    console.log("Invalid date");
    return;
  }
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .updateOne({ name: listName }, { $set: { dueDate: newDueDate } });

  console.log("Edited list", result);

  return result;
}

//Tsting

const testList = new ToDoList(
  "TestList",
  "Test Owner",
  ["Test Item 1", "Test Item 2"],
  "2021-10-10",
  "Test Guild Id"
);

createList(testList);
viewAList("TestList");
viewAllLists("Test Guild Id");
deleteList("TestList");
editList("TestList", "NewTestList");
editDueDate("NewTestList", "2021-10-11");
checkListName("NewTestList");
