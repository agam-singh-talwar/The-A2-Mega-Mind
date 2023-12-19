// Class to store the list of to do items
const { randomUUID } = require("crypto");

class ToDoList {
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
    name = "To Do List",
    owner = null,
    list = [],
    dueDate = null,
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

module.exports = ToDoList;
