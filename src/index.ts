import "dotenv/config";

import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";
import interactionHandler from "./interactionHandler";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN) {
	throw new Error("No token provided");
}

if (!CLIENT_ID) {
	throw new Error("No client ID provided");
}

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as ${readyClient.user?.tag}`);
	readyClient.user.setPresence({
		activities: [{ name: "🌐 /timezone", type: ActivityType.Custom }],
		status: "online",
	});
});

client.on(Events.InteractionCreate, interactionHandler);

client.login(TOKEN);
