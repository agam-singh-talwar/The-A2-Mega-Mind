// Class to store the list of to do items

export class ToDoList {
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
    this.guildId = guildId;
    this.name = name;
    this.created = new Date();
    this.dueDate = dueDate;
    this.updated = new Date();
    this.owner = owner;
    this.list = list;
  }
}

export default ToDoList;
