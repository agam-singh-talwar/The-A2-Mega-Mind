const Task = require("../../src/Task.js");
const List = require("../../src/List.js");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-a-specific-to-do-list")
    .setDescription("It helps you to view a To Do List.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the list to edit.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const listItems = []; // Define an empty array for the list items
    // ! Retrieve the list from the database and edit it
    const list = new List(name, listItems);
    const listJson = list.toJson();
    await interaction.reply(`List! ${listJson}`);
  },
};
