import "dotenv/config";

import { Collection } from "discord.js";

import ping from "./utility/ping";
import timezone from "./utility/timezone";
import { Command } from "./types";

const commands = [ping, timezone];

const commandsCollection = new Collection<string, Command>();

for (const command of commands) {
	commandsCollection.set(command.data.name, command);
}

export { commands, commandsCollection };
