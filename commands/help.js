const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists commands'),
	async execute(interaction) {
		await interaction.reply('ServerInfo - shows server\'s stats\nUserInfo - shows user\'s ID');
	},
};