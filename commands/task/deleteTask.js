import { SlashCommandBuilder } from "discord.js";
import { deleteTask } from "../../src/db/mongo.js";

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
  const listName = interaction.options.getString("list-name");
  const taskName = interaction.options.getString("task-name");

  await deleteTask(listName, taskName);

  await interaction.reply(`Task Deleted! ${taskName}`);
}
