/**
 * @file discord/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This file is used to initialize the Discord client.
 */
import { Client, GatewayIntentsString } from 'discord.js';
import onReady from './events/onReady';
import onInteraction from './events/onInteraction';
import config from '../utils/config';
import Logger from '../utils/logger';

const intents: GatewayIntentsString[] = ['Guilds', 'GuildMessages'];
export default async () => {
	const client = new Client({ intents });

	Logger.logInfo('Starting Discord client...');

	client.on('ready', async () => {
		Logger.logSuccess('Discord client is ready.');
		await onReady();
	});

	client.on('interactionCreate', async (interaction) => {
		await onInteraction(interaction);
	});

	await client.login(config.DISCORD_BOT_TOKEN);
};
