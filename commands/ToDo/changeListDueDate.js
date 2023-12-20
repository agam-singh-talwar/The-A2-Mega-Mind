import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("change-due-date")
  .setDescription("It helps you to edit a To Do List's due date.")
  .addStringOption((option) => option
    .setName("due-date")
    .setDescription("The due date of the list to edit.")
    .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("due-date");
  const listItems = []; // Define an empty array for the list items

  // ! Retrieve the list from the database and edit it
  const list = new List(name, listItems);
  const listJson = list.toJson();
  await interaction.reply(`List edited! ${listJson}`);
}
