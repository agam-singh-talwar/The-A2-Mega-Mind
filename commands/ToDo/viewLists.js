import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ToDoList } from "../../src/List.js";
import { load } from "../../src/db/db.js";

export const data = new SlashCommandBuilder()
  .setName("view-all-to-do-lists")
  .setDescription("It helps you to view a To Do List.");
export async function execute(interaction) {
  const file = await load("list");
  
  if (!file) {
    await interaction.reply({ content: "No data found", ephemeral: true });
    console.error("No data found");
    return;
  }

  const list = ToDoList.fromJson(file);
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
}
