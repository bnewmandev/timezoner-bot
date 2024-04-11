import { Interaction } from "discord.js";

import { commandsCollection as commands } from "./commands/commands";

const interactionHandler = async (interaction: Interaction<"cached">) => {
	if (interaction.isAutocomplete()) {
		const command = commands.get(interaction.commandName);
		if (!command) {
			console.error(`Command ${interaction.commandName} not found.`);
		}
		try {
			await command!.autocomplete!(interaction);
		} catch (error) {
			console.error(error);
		}
	} else if (interaction.isCommand()) {
		const { commandName } = interaction;
		if (commands.has(commandName)) {
			commands.get(commandName)!.execute(interaction);
		}
	}
};

export default interactionHandler;
