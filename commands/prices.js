const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prices')
		.setDescription('lists the price of pure'),
	async execute(interaction) {
        const {cacPrice, pbsPrice, fedPrice, vilPrice, gemPrice, jwlPrice} = require('../prices.json');

		await interaction.reply(`${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PhiloCac')} - $${cacPrice}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PB')} - $${pbsPrice}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Fedur')} - $${fedPrice}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'vile')} - $${vilPrice}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Gem')} - $${gemPrice}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'JewelSword')} - $${jwlPrice}
        `);
	},
};

