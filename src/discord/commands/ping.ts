import { SlashCommandBuilder } from 'discord.js';
import { Command } from './Command';

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('pong')
		.setDescription('Replies with Ping!'),
	execute: async (interaction) => {
		await interaction.reply('Ping!');
	},
};

export default command;
