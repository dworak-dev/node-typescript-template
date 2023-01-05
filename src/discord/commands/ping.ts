import { SlashCommandBuilder } from 'discord.js';
import { Command } from './Command';

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('pong')
		.setDescription('Replies with Ping!')
		.addStringOption((option) => {
			return option
				.setName('input')
				.setDescription('The input to echo back');
		}),
	execute: async (interaction) => {
		const input = interaction.options.data[0].value;

		await interaction.reply(`Pong! ${input}`);
	},
};

export default command;
