import { SlashCommandBuilder } from "discord.js";
import { save } from "../../src/db/db.js";
import List from "../../src/List.js";

export const data = new SlashCommandBuilder()
  .setName("create-a-to-do-list")
  .setDescription("It helps you to create a To Do List")
  .addStringOption((option) => option
    .setName("name")
    .setDescription("The name of the list")
    .setRequired(true)
  )
  .addUserOption((option) => option
    .setName("owner")
    .setDescription("The owner of the list")
    .setRequired(true)
  )
  .addStringOption((option) => option
    .setName("due-date")
    .setDescription("The due date of the list")
    .setRequired(false)
  );
export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const owner = interaction.options.getUser("owner");
  const guildId = interaction.guild.id;
  const dueDate = interaction.options.getString("dueDate");
  const list = new List(name, owner, [], dueDate, guildId);
  const listJson = list.toJson();

  save("list", listJson);

  await interaction.reply(`List Created! ${listJson}`);
}
