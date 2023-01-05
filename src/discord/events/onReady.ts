import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import Logger from '../../utils/logger';
import commands from '../commands';
import config from '../../utils/config';

export default async (): Promise<void> => {
	try {
		const rest = new REST({ version: '10' }).setToken(
			config.DISCORD_BOT_TOKEN,
		);

		const commandData: {
			name: string;
			description?: string;
			type?: number;
			options?: APIApplicationCommandOption[];
		}[] = [];

		commands.forEach((command) =>
			commandData.push(
				command.data.toJSON() as {
					name: string;
					description?: string;
					type?: number;
					options?: APIApplicationCommandOption[];
				},
			),
		);
		Logger.logInfo('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
			body: commandData,
		});
		Logger.logInfo('Successfully reloaded application (/) commands.');
	} catch (err) {
		if (err instanceof Error) Logger.logError(err);
	}
};
