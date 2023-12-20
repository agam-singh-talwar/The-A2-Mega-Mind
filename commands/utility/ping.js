import { SlashCommandBuilder } from "discord.js";
import { setTimeout as wait } from "node:timers/promises";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");
export async function execute(interaction) {
  await interaction.reply("Pong!");
  await wait(2000);
  await interaction.editReply({ content: "Secret Pong!", ephemeral: true });
  await interaction.deleteReply();
}
