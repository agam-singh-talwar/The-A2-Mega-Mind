import { connect } from "./db.js";
import ToDoList from "../List.js";

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

export async function createTask(list, task) {
  const client = await connect();

  const exists = await checkListName(list.name);
  if (!exists) {
    console.warn("List name not found");

    return null;
  }

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: list.name },
      { $push: { tasks: task } },
      { returnDocument: "after" }
    );

  console.log(`New task created with the following id: ${result.value._id}`);

  return result;
}

export async function deleteTask(list, task) {
  const client = await connect();

  const exists = await checkListName(list.name);
  if (!exists) {
    console.warn("List name not found");

    return null;
  }

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: list.name },
      { $pull: { tasks: { name: task.name } } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    console.warn(`Task named ${task.name} not found in list ${list.name}`);
    return null;
  }

  console.log(`Task removed with the following id: ${result.value._id}`);

  return result;
}

export async function updateTask(list, task) {
  const client = await connect();

  const exists = await checkListName(list.name);
  if (!exists) {
    console.warn("List name not found");

    return null;
  }

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: listName, "tasks.name": task.name },
      { $set: { "tasks.$": task } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    console.warn(`Task named ${task.name} not found in list ${list.name}`);
    return null;
  }

  console.log(`Task named ${task.name} updated in list ${listName}`);
}
