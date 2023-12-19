const Task = require("../../src/Task.js");
const List = require("../../src/List.js");
const db = require("../../src/db/db.js");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("View-a-specific-to-do-list")
    .setDescription("It helps you to view a To Do List.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the list to edit.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");

    console.log(await db.load('list'));

    const list = List.fromJson(await db.load('list'));

    const embed = new EmbedBuilder()
      .setColor('Random')
      .setDescription('Lists')
      .setTimestamp(list.dueDate)
      .addFields({name: 'name', value: list.name})
      .addFields({name: 'owner', value: list.owner.username});
    
    await interaction.reply({ embeds: [embed], ephemeral: true })
      .catch(console.error);
  },
};
