import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { deleteList } from "../../src/db/mongo.js";
import { checkListName } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("delete-to-do-list")
  .setDescription("It helps you to delete a To Do List.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");

  //  Check if the list exists
  const check = await checkListName(name);
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const res = await deleteList(name, guildId);
  if (!res) {
    await interaction.reply(`Error:${res}`);
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle(` ${name}`)
    .setDescription(`List ${name} deleted`)
    .setColor("#FF0000")
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
