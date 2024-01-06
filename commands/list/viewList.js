import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ToDoList } from "../../src/List.js";
import { viewAList } from "../../src/db/mongo.js";
import { checkListName } from "../../src/db/mongo.js";

export const data = new SlashCommandBuilder()
  .setName("view-specific-list")
  .setDescription("It helps you to view a To Do List.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The name of the list to edit.")
      .setRequired(true)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const check = await checkListName(name); // Check if the list exists
  if (!check) {
    await interaction.reply(`List does not exist!`);
    return;
  }
  const list = await viewAList(name, guildId);
  // only to return lists that belong to the server with the given name
  if (!list) {
    await interaction.reply(`No lists found!`);
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle(` ${list.name}`)
    .setDescription(` ${list.description}`)
    .setColor("#00ff00")
    .setTimestamp()
    .addFields(
      { name: "Owner", value: `${list.owner.globalName}`, inline: false },
      { name: "Due Date", value: `${list.dueDate}`, inline: false },
      { name: "Created", value: `${list.created}`, inline: false },
      { name: "Updated", value: `${list.updated}`, inline: false }
    );
  await interaction.reply({ embeds: [embed] });
}
