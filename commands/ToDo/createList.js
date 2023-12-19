const Task = require("../../src/Task.js");
const List = require("../../src/List.js");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-a-to-do-list")
    .setDescription("It helps you to create a To Do List")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the list")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("owner")
        .setDescription("The owner of the list")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("due-date")
        .setDescription("The due date of the list")
        .setRequired(false)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const owner = interaction.options.getUser("owner");
    const dueDate = interaction.options.getString("dueDate");
    const listItems = []; // Define an empty array for the list items
    const list = new List(name, owner, listItems, dueDate);
    const listJson = list.ToJson();
    await interaction.reply(`List Created! ${listJson}`);
  },
};
