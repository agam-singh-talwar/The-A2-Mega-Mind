<<<<<<< HEAD
import { SlashCommandBuilder } from "discord.js";
import { checkListName, createList } from "../../src/db/mongo.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("create-list")
  .setDescription("Create a list")
  .addStringOption(
    (option) =>
      option
        .setName("name")
        .setDescription("The name of the list")
        .setRequired(true) // Name is required
  )
  .addUserOption(
    (option) =>
      option
        .setName("owner")
        .setDescription("The person responsible for the list")
        .setRequired(true) // Someone must be responsible for the list
  )
  .addStringOption((option) =>
    option
      .setName("due-date")
      .setDescription("The due date of the list")
      .setRequired(false)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const check = await checkListName(name);
  if (check) {
    await interaction.reply(`List already exists!`);
    return;
  }
  const owner = interaction.options.getUser("owner");
  const guildId = interaction.guild.id; // Store the guild id of the server the list belongs to
  const dueDate = interaction.options.getString("dueDate");
  const list = new List(name, owner, guildId, dueDate);
  const res = await createList(list);
  if (!res) {
    await interaction.reply(`Error:${res}`);
    return;
  }
  await interaction.reply(`List Created! ${listJson}`);
}
=======
>>>>>>> d53e3bb (Update)
