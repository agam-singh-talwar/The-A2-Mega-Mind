import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("delete-task")
  .setDescription("Delete a task from a list")
  .addStringOption((option) => option
    .setName("task-name")
    .setDescription("Name of the task")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName("list-name")
    .setDescription("Name of the list the task can be found in")
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
