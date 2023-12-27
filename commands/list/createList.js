import { SlashCommandBuilder } from "discord.js";
import { createList } from "../../src/db/mongo.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("create-list")
  .setDescription("It helps you to create a To Do List")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list")
      .setRequired(true)
  )
  .addUserOption((option) =>
    option
      .setName("owner")
      .setDescription("The person responsible for the list")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("due-date")
      .setDescription("The due date of the list")
      .setRequired(false)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const owner = interaction.options.getUser("owner");
  const guildId = interaction.guild.id;
  const dueDate = interaction.options.getString("dueDate");
  const list = new List(name, owner, guildId, dueDate);
  const res = await createList(list);
  if (!res) {
    await interaction.reply(`List already exists!`);
    return;
  }
  await interaction.reply(`List Created! ${listJson}`);
}
