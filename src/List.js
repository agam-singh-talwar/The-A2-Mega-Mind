// Class to store the list of to do items
import { Tasks } from "./Task.js";

class ToDoList {
  constructor(name = "To Do List", owner = null, list = [], dueDate = null) {
    // !this.id  = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.created = new Date();
    this.dueDate = dueDate;
    this.updated = new Date();
    this.owner = owner;
    this.list = list;
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
  ToJson() {
    return JSON.stringify(this);
  }
}
