//  Class to store the task items for the ToDoList

export class Task {
  constructor({ name = "", description = "", owner = null, assignee = null, dueDate = null }) {
    // this.id = randomUUID();
    this.name = name;
    // Description of the task [optional]
    this.description = description;
    // The person who created the task
    this.owner = owner;
    this.created = new Date();
    this.updated = new Date();
    // The person who is assigned to the task
    this.assignee = assignee;
    // The status of the task
    this.status = false;
    this.dueDate = dueDate;
  }
}

export default Task;
