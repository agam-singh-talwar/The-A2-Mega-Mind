import { SlashCommandBuilder } from "discord.js";
import { createTask } from "../../src/db/mongo.js";
import { Task } from "../../src/Task.js";

export const data = new SlashCommandBuilder()
  .setName("create-task")
  .setDescription("Create a task in the specified list")
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
  )
  .addUserOption((option) =>
    option
      .setName("owner")
      .setDescription("The owner of the task")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("The description of the task")
      .setRequired(false)
  )
  .addUserOption((option) =>
    option
      .setName("assignee")
      .setDescription("The person responsible for completing the task")
      .setRequired(false)
  );

export async function execute(interaction) {
  const list = interaction.options.getString("list");
  const name = interaction.options.getString("name");
  const owner = interaction.options.getUser("owner");
  const description = interaction.options.getString("description");
  const assignee = interaction.options.getUser("assignee");
  const task = new Task({
    name: name,
    description: description,
    owner: owner,
    assignee: assignee,
  });

  await createTask(list, task);

  await interaction.reply(`Task Created! ${task}`);
}
