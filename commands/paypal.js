const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('paypal')
		.setDescription('Sends the correct PayPal'),
	async execute(interaction) {
		await interaction.reply(`PayPal: [@goldenwind0001](https://www.paypal.com/paypalme/goldenwind0001)`);
	},
};