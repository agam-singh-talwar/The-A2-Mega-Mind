import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { viewAList, editDueDate, checkListName } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("change-due-date")
  .setDescription("It helps you to edit a To Do List's due date.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("due-date")
      .setDescription("The due date of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const dueDate = interaction.options.getString("due-date");
  const name = interaction.options.getString("name");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const check = checkListName(name, guildId);
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const res = await editDueDate(name, guildId, dueDate);
  if (!res) {
    await interaction.reply(`Error:${res}`);
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle(` ${name}`)
    .setDescription(`List ${name} updated`)
    .setColor("#0000ff")
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
