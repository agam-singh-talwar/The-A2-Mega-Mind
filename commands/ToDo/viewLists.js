const Task = require("../../src/Task.js");
const List = require("../../src/List.js");
const db = require("../../src/db/db.js");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-all-lists")
    .setDescription("It helps you to view a To Do List."),
  async execute(interaction) {
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
