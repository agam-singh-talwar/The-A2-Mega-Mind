<<<<<<< HEAD
import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("delete-to-do-list")
  .setDescription("It helps you to delete a To Do List.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");

  //  Check if the list exists
  const check = await checkListName(name);
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const res = await deleteList(name);
  if (!res) {
    await interaction.reply(`Error:${res}`);
    return;
  }
}
=======
>>>>>>> d53e3bb (Update)
