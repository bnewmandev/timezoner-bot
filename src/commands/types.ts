import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
	data: Partial<SlashCommandBuilder> & Pick<SlashCommandBuilder, "toJSON" | "name">;
	execute: (interaction: CommandInteraction<"cached">) => Promise<void>;
	autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}
