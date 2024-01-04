import { connect } from "./db.js";

async function checkConnection(listName) {
  const client = await connect();

  const exists = await checkListName(listName);
  if (exists) {
    console.log("Name already exists");
  }

  return client;
}

export async function createList(newListing) {
  const client = checkConnection(newListing.name);

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
export async function viewAList(listName, guildId) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOne({ name: listName, guildId: guildId });

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
export async function deleteList(listName, guildId) {
  const client = await connect();
  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .deleteOne({ name: listName, guildId: guildId });

  console.log("Deleted list", result);

  return result;
}

//  Edit a list's name
export async function editList(listName, newName) {
  const client = checkConnection(listName);

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .updateOne({ name: listName }, { $set: { name: newName } });

  console.log("Edited list", result);

  return result;
}

// Edit a list's due date
export async function editDueDate(listName, guildid, newDueDate) {
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
    .updateOne(
      { name: listName, guildId: guildid },
      { $set: { dueDate: newDueDate } }
    );

  console.log("Edited list", result);

  return result;
}

export async function createTask(listName, task) {
  const client = await checkConnection(listName);

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: listName },
      { $push: { tasks: task } },
      { returnDocument: "after" }
    );

  console.log(
    `New task created with the following id: ${JSON.stringify(result)}`
  );

  return result;
}

export async function deleteTask(listName, taskName) {
  const client = await checkConnection(listName);

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: listName },
      { $pull: { tasks: { name: taskName } } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    console.warn(`Task named ${taskName} not found in list ${listName}`);
    return null;
  }

  console.log(`Task removed with the following id: ${result.value._id}`);

  return result;
}

export async function updateTask(listName, task) {
  const client = await checkConnection(listName);

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: listName, "tasks.name": task.name },
      { $set: { "tasks.$": task } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    console.warn(`Task named ${task.name} not found in list ${listName}`);
    return null;
  }

  console.log(`Task named ${task.name} updated in list ${listName}`);
}

export async function toggleTask(listName, task) {
  const client = await checkConnection(listName);

  const result = await client
    .db("A2_Bot")
    .collection("Lists")
    .findOneAndUpdate(
      { name: listName, "tasks.name": task.name },
      { $set: { "tasks.$.status": !task.status } },
      { returnDocument: "after" }
    );

  if (!result.value) {
    console.warn(`Task named ${task.name} not found in list ${listName}`);
    return null;
  }

  console.log(`Task named ${task.name} toggled in list ${listName}`);
}
