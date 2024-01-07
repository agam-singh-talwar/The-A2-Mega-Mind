import { SlashCommandBuilder } from "discord.js";
import { toggleTask } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("toggle-task")
  .setDescription("Mark a specified task as completed or incomplete")
  .addStringOption((option) =>
    option
      .setName("list-name")
      .setDescription("The list the task should be associated with")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("task-name")
      .setDescription("The name of the task")
      .setRequired(true)
  );

export async function execute(interaction) {
  const listName = interaction.options.getString("list-name");
  const taskName = interaction.options.getString("task-name");

  const status = await toggleTask(listName, taskName);

  if (status === null) {
    await interaction.reply(`No task with that name could be found.`);
  } else {
    await interaction.reply(`Task toggled!`);
  }
}
