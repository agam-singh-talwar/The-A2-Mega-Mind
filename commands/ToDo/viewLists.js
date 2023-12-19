const Task = require("../../src/Task.js");
const List = require("../../src/List.js");
const db = require("../../src/db/db.js");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-all-to-do-lists")
    .setDescription("It helps you to view a To Do List."),
  async execute(interaction) {
    const file = await db.load("list");
    if (!file) {
      await interaction.reply({ content: "No data found", ephemeral: true });
      console.error("No data found");
      return;
    }
    const list = List.fromJson(file);
    const GuildId = interaction.guild.id;
    console.log("GuildId -> ", GuildId);

    const lists = [];
    console.log("list -> ", typeof list);
    for (const item of list) {
      console.log("item -> ", item);
      if (item.guildId == GuildId) lists.push(item);
    }

    console.log("lists -> ", lists);
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
