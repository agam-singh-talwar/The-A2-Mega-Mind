import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { viewAllLists } from "../../src/db/mongo.js";
export const data = new SlashCommandBuilder()
  .setName("view-all-to-do-lists")
  .setDescription("It helps you to view a To Do List.");

export async function execute(interaction) {
  const GuildId = interaction.guild.id;
  const lists = await viewAllLists(GuildId);
  if (!lists) {
    await interaction.reply(`No lists found!`);
    return;
  }
  console.log(JSON.stringify(lists));
  const embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription("To Do List");

  for (let i = 0; i < lists.length; i++) {
    embed.addField({ name: "S.NO", value: i + 1, inline: true });
    embed.addField({ name: "Name", value: lists[i].name, inline: true });
    embed.addField({ name: "Owner", value: lists[i].owner, inline: true });
    embed.addField({
      name: "Due Date",
      value: lists[i].dueDate.toLocaleString(),
      inline: true,
    });
  }

  await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch(console.error);
}
