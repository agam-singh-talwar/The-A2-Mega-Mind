//  Class to store the task items for the ToDoList
import { randomUUID } from "crypto";

export class Tasks {
  static fromJson(json) {
    const taskData = JSON.parse(json);
    const task = new Tasks(taskData.name, taskData.owner, taskData.assignee);

    return task;
  }

  constructor(name = "Task", owner = null, assignee = null) {
    // this.id = randomUUID();
    this.name = name;
    // Description of the task [optional]
    this.description = null;
    // The person who created the task
    this.owner = owner;
    this.created = new Date();
    this.updated = new Date();
    // The person who is assigned to the task
    this.assignee = assignee;
    // The status of the task
    this.status = false;
  }

  edit(name, assignee, status) {
    this.name = name;
    this.assignee = assignee;
    this.status = status;
    this.updated = new Date();
  }

  markComplete() {
    this.status = true;
  }

  markIncomplete() {
    this.status = false;
  }

  // converts the object to JSON
  toJson() {
    return JSON.stringify(this);
  }
}

export default Tasks;
