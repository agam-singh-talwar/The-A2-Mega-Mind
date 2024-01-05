import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { viewAllLists } from "../../src/db/mongo.js";
export const data = new SlashCommandBuilder()
  .setName("view-all-to-do-lists")
  .setDescription("It helps you to view a To Do List.");

export async function execute(interaction) {
  const GuildId = interaction.guild.id;
  const lists = await viewAllLists(GuildId);
  if (!lists || lists.length === 0) {
    await interaction.reply(`No lists found!`);
    return;
  }
  console.log(lists);
  const embed = new EmbedBuilder() // Use EmbedBuilder instead of MessageEmbed
    .setColor("#0099ff")
    .setTitle("To Do Lists")
    .setDescription(
      lists.map((list, index) => `${index + 1}. ${list}`).join("\n")
    ); // Format the lists into a string

  await interaction.reply({ embeds: [embed] }); // Send the embed
}
