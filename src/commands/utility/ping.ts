import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const ping: Command = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply("Pong!");
	},
};

export default ping;
