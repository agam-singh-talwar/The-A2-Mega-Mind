const { SlashCommandBuilder, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-a-cute-dog")
    .setDescription("Who doesn't loves a cute dog!!."),
  async execute(interaction) {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    // const embed = new MessageEmbed()
    //   .setURL(data.message)
    //   .setImage(data.message);
    await interaction.reply(res.message);
  },
};
