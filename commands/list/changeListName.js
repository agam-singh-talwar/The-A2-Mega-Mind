import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { viewAList, editList } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("change-name-of-the-to-do-list")
  .setDescription("It helps you to edit a To Do List's name")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to be updated!.")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("new-name")
      .setDescription("The new name of the list!.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const newName = interaction.options.getString("new-name");
  const check = await viewAList(name, guildId);
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const res = await editList(name, guildId, newName);
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
