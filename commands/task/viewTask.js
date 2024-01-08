import { SlashCommandBuilder } from "discord.js";
import { createTask } from "../../src/db/mongo.js";
import { Task } from "../../src/Task.js";

export const data = new SlashCommandBuilder()
  .setName("view-task")
  .setDescription("View a specific task")
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
  const task = interaction.options.getString("list-name");
  const name = interaction.options.getString("task-");

  const tasks = [{name: 'Tasks:', value: ' ', inline: false}];

  for (const task of list.tasks) {
    tasks.push({ name: 'Name:', value: task.name, inline: true });
    tasks.push({ name: 'Owner:', value: task.owner.username, inline: true });
    tasks.push({ name: 'Completed:', value: task.status ? '☒' : '☐', inline: true });

    task.assignee?.username && tasks.push({ name: 'Assignee:', value: task.assignee.username, inline: true });
    task.description && tasks.push({ name: 'Description:', value: task.description, inline: true });  
  }

  const embed = new EmbedBuilder()
    .setTitle(` ${task.name}`)
    .setDescription(` ${list.description}`)
    .setColor("#00ff00")
    .setTimestamp()
    .addFields(
      { name: "Tasks: ", value: ' ', inline: false },
      ...tasks
    );

  await interaction.reply({ embeds: [embed] });
}
