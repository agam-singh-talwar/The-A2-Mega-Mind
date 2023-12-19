//  Class to store the task items for the ToDoList
const { randomUUID } = require("crypto");
class Tasks {
  constructor(name = "Task", owner = null, assignee = null) {
    this.id = randomUUID();
    this.name = name;
    this.owner = owner;
    this.created = new Date();
    this.updated = new Date();
    this.assignee = null;
    this.status = false;
  }

  edit(name, assignee, status) {
    this.name = name;
    this.assignee = assignee;
    this.status = status;
    thius.updated = new Date();
  }

  markComplete() {
    this.status = true;
  }

  markIncomplete() {
    this.status = false;
  }

  // converts the object to JSON
  ToJson() {
    return JSON.stringify(this);
  }
}

module.exports = Tasks;
