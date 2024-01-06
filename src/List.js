// Class to store the list of to do items

export class ToDoList {
  constructor(
    // Each name must be unique
    name = "To Do List",
    // If no onwer is provided it;s the perdon who made the list/ invoked the bot
    owner = null,
    // Format  YYYY-MM-DD
    dueDate = null,
    // The guild id of the server the list belongs to
    guildId = null,
    description = null
  ) {
    this.guildId = guildId;
    this.name = name;
    this.created = new Date();
    this.dueDate = dueDate;
    this.updated = new Date();
    this.owner = owner;
    this.description = description;
  }
}

export default ToDoList;
