import { SlashCommandBuilder } from "discord.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("update-task")
  .setDescription("Update a task in the specified list")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the task")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("list")
      .setDescription("The list the task should be associated with")
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
  const name = interaction.options.getString("name");
  const owner = interaction.options.getUser("owner");
  const guildId = interaction.guild.id;
  const dueDate = interaction.options.getString("dueDate");
  const list = new List(name, owner, [], dueDate, guildId);
  const listJson = list.toJson();

  save("list", listJson);

  await interaction.reply(`List Created! ${listJson}`);
}
