// Class to store the list of to do items
import { randomUUID } from "crypto";

export class ToDoList {
  static fromJson(json) {
    const listData = JSON.parse(json);
    const toDoList = new ToDoList(
      listData.name,
      listData.owner,
      listData.list,
      listData.dueDate
    );

    return toDoList;
  }

  constructor(
    // Each nbame must be unique
    // ! Check if the name is not used before
    // ! Check if the name is alphanumeric
    name = "To Do List",
    // If no onwer is provided it;s the perdon who made the list/ invoked the bot
    owner = null,
    list = [],
    // Format  YYYY-MM-DD
    dueDate = null,
    // The guild id of the server the list belongs to
    guildId = null
  ) {
    // Check if the name is alphanumeric
    // ! Also check if the name is not used before
    if (!/^[a-z0-9]+$/i.test(name)) {
      throw new Error(
        "Name must be alphanumeric and cannot contain any spaces or symbols"
      );
    }
    this.id = randomUUID();
    this.guildId = guildId;
    this.name = name;
    this.created = new Date();
    this.dueDate = dueDate;
    this.updated = new Date();
    this.owner = owner;
    this.list = list;
  }

  // edit the name of the list
  editName(name) {
    if (!/^[a-z0-9]+$/i.test(name)) {
      throw new Error(
        "Name must be alphanumeric and cannot contain any spaces or symbols"
      );
    }
    this.updated = new Date();
    this.name = name;
  }

  add(item) {
    this.updated = new Date();
    this.list.push(item);
  }

  remove(item) {
    this.updated = new Date();
    // remove the item from the list
    this.list = this.list.filter((task) => task !== item);
  }

  getList() {
    return this.list;
  }

  // converts the object to JSON
  toJson() {
    return JSON.stringify(this);
  }
}

export default ToDoList;
