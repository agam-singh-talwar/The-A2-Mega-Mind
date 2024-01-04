import { SlashCommandBuilder } from "discord.js";
import { toggleTask } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("complete-task")
  .setDescription("Mark a specified task as completed")
  .addStringOption((option) =>
    option
      .setName("list")
      .setDescription("The list the task should be associated with")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the task")
      .setRequired(true)
  );

export async function execute(interaction) {
  const list = interaction.options.getString("list");
  const name = interaction.options.getString("name");

  await toggleTask(list, name);

  await interaction.reply(`Task Created! ${task}`);
}
