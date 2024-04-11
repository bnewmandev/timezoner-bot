import "dotenv/config";

import {
	REST,
	RESTPostAPIApplicationGuildCommandsResult,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from "discord.js";
import { commands } from "./commands";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

interface DeployProps {
	guildId?: string;
	clientId: string;
	token: string;
}

const deployCommands = async ({ guildId, token, clientId }: DeployProps) => {
	const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	for (const command of commands) {
		body.push(command.data.toJSON());
	}

	const rest = new REST().setToken(token);
	try {
		console.log("Started refreshing application (/) commands.");

		let data = [];

		if (guildId) {
			data = (await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: body,
			})) as RESTPostAPIApplicationGuildCommandsResult[];
		} else {
			data = (await rest.put(Routes.applicationCommands(clientId), {
				body: body,
			})) as [];
		}

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
};

if (!TOKEN) {
	throw new Error("No token provided");
}

if (!CLIENT_ID) {
	throw new Error("No client ID provided");
}

deployCommands({ guildId: process.env.DEV_GUILD_ID, clientId: CLIENT_ID, token: TOKEN });
