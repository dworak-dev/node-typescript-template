import { Client } from 'discord.js';
import intents from './config/intents';
import onRun from './events/onReady';
import onInteraction from './events/onInteraction';
import config from '../utils/config';
import Logger from '../utils/logger';

export default async () => {
	const client = new Client({ intents });

	Logger.logInfo('Starting Discord client...');

	client.on('ready', async () => {
		await onRun();
	});

	client.on('interactionCreate', async (interaction) => {
		await onInteraction(interaction);
	});

	await client.login(config.DISCORD_BOT_TOKEN);
};
