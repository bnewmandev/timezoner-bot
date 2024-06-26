import { Interaction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
const choices = [
	"GMT-12",
	"GMT-11",
	"GMT-10",
	"GMT-09",
	"GMT-08",
	"GMT-07",
	"GMT-06",
	"GMT-05",
	"GMT-04",
	"GMT-03",
	"GMT-02",
	"GMT-01",
	"GMT±00",
	"GMT+01",
	"GMT+02",
	"GMT+03",
	"GMT+04",
	"GMT+05",
	"GMT+06",
	"GMT+07",
	"GMT+08",
	"GMT+09",
	"GMT+10",
	"GMT+11",
	"GMT+12",
];
const timezone: Command = {
	data: new SlashCommandBuilder()
		.setName("timezone")
		.setDescription("Gives the user a role with the timezone they specify.")
		.addStringOption((option) =>
			option
				.setName("offset")
				.setDescription("The timezone offset.")
				.setRequired(true)
				.addChoices(...choices.map((choice) => ({ name: choice, value: choice })))
		),
	async execute(interaction) {
		const offset = interaction.options.get("offset", true).value as string;
		const member = interaction.member;
		const guild = interaction.guild;

		let response = "An unknown error occurred. Please try again later.";

		if (offset) {
			let role = guild.roles.cache.find((r) => r.name === offset);
			if (!role) {
				role = await guild.roles.create({
					name: offset,
					color: "#000000",
					mentionable: false,
					reason: `Role for timezone ${offset}`,
				});
			}
			try {
				const oldRole = member.roles.cache.find((r) => choices.includes(r.name));
				if (oldRole) {
					await member.roles.remove(oldRole);
				}

				await member.roles.add(role);
				response = `You have been given the ${offset} role.`;
			} catch (error) {
				console.error(error);
				response = `An error occurred while assigning the role ${offset}.`;
			}
		} else {
			response = `No timezone offset was provided.`;
		}
		await interaction.reply(response);
	},
};

export default timezone;
