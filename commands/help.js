const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists commands'),
	async execute(interaction) {
		await interaction.reply('Payments - Shows the payments accepted\n\nStock - shows the availible pure Stock\n\nPure calc - Calculates how much an order of pure costs, uses suffixes cac, pbs, fed, vil, gem, jwl. \nExample: /purecalc 10pbs 1cac 3jwl 3.5vil 64fed     Cac and vile are taken counted as stacks.');
	},
};