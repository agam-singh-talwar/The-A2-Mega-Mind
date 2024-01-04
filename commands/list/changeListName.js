<<<<<<< HEAD
import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";
import { viewAList, deleteList } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("change-name-of-the-to-do-list")
  .setDescription("It helps you to edit a To Do List's name")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const check = await viewAList(name, guildId);
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const res = await deleteList(name, guildId);
  if (!res) {
    await interaction.reply(`Error:${res}`);
    return;
  }
  await interaction.reply(`List Created! ${list}`);
}
=======
>>>>>>> d53e3bb (Update)
