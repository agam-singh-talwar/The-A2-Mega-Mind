import { SlashCommandBuilder } from "discord.js";
import { ToDoList } from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("view-specific-list")
  .setDescription("It helps you to view a To Do List.")
  .addStringOption((option) => option
    .setName("name")
    .setDescription("The name of the list to edit.")
    .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const listItems = []; // Define an empty array for the list items
  const list = new ToDoList(name, listItems);
  const listJson = list.toJson();
  
  await interaction.reply(`List! ${listJson}`);
}
