import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("meme")
  .setDescription("Replies with a random meme!");

export async function execute(interaction) {
  // Get a random meme from the API  https://meme-api.com/gimme/1
  const response = await fetch("https://meme-api.com/gimme/1");
  const json = await response.json();
  //   console.log(json);
  const preview = json.memes[0].preview;
  //   console.log(preview);
  const meme = preview.pop();
  //   console.log(meme);

  await interaction.reply(meme);
}
