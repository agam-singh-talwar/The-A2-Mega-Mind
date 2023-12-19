const Task = require("../../src/Task.js");
const List = require("../../src/List.js");
const db = require("../../src/db/db.js");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-all-to-do-lists")
    .setDescription("It helps you to view a To Do List."),
  async execute(interaction) {
    const list = List.fromJson(await db.load("list"));
    console.log(list);
    const GuildId = interaction.guild.id;
    const lists = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].guildId === GuildId) lists.push(list[i]);
    }

    console.log(lists);
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription("To Do List");

    for (let i = 0; i < lists.length; i++) {
      embed.addField({ name: "S.NO", value: i + 1, inline: true });
      embed.addField({ name: "Name", value: lists[i].name, inline: true });
      embed.addField({ name: "Owner", value: lists[i].owner, inline: true });
      embed.addField({
        name: "Due Date",
        value: lists[i].dueDate.toLocaleString(),
        inline: true,
      });
    }

    await interaction
      .reply({ embeds: [embed], ephemeral: false })
      .catch(console.error);
  },
};
