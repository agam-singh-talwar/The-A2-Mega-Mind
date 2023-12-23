import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("delete-to-do-list")
  .setDescription("It helps you to delete a To Do List.")
  .addStringOption((option) => option
    .setName("name")
    .setDescription("The name of the list to edit.")
    .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const listItems = []; // Define an empty array for the list items

  // ! Retrieve the list from the database and edit it
  const list = new List(name, listItems);
  const listJson = list.toJson();
  await interaction.reply(`List Deleted! ${listJson}`);
}
