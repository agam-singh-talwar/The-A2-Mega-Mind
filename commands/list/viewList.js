import { SlashCommandBuilder } from "discord.js";
import { ToDoList } from "../../src/List.js";
import { viewAList } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("view-specific-list")
  .setDescription("It helps you to view a To Do List.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const check = await ToDoList.checkListName(name, guildId);
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const list = await viewAList(name, guildId);
  // only to return lists that belong to the server with the given name
  if (!list) {
    await interaction.reply(`No lists found!`);
    return;
  }
  await interaction.reply(`List Created! ${list}`);
}
