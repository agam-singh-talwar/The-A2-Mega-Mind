const Task = require("../../src/Task.js");
const List = require("../../src/List.js");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-to-do-lists")

    .setDescription("It helps you to view a To Do List.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the list to edit.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const list = List.fromJson(await db.load("list"));

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription("Lists")
      .setTimestamp(list.dueDate)
      .addFields({ name: "name", value: list.name })
      .addFields({ name: "owner", value: list.owner.username });

    await interaction
      .reply({ embeds: [embed], ephemeral: false })
      .catch(console.error);
  },
};
