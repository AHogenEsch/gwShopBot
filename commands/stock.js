const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stock')
		.setDescription('lists stock for cac, pbs, vile, and '),
	async execute(interaction) {
        const {cacCount, pbsCount, fedCount, vilCount, gemCount, jwlCount} = require('../stock.json');

		await interaction.reply(`${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PhiloCac')} - ${cacCount} or ${cacCount / 64} stacks\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PB')} - ${pbsCount}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Fedur')} - ${fedCount}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'vile')} - ${vilCount} or ${vilCount / 64} stacks\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Gem')} - ${gemCount}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'JewelSword')} - ${jwlCount}
        `);
	},
};

