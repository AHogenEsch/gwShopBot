const { SlashCommandBuilder } = require('@discordjs/builders');
// const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { airtable } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newkey')
		.setDescription('Lists commands')
		.addUserOption(user =>
			user.setName('user')
			.setDescription('The user the key is for')
			.setRequired(true))
		.addStringOption(duration =>
			duration.setName('duration')
			.setDescription('How long the key should last')
			.setRequired(true)),
	async execute(interaction) {
		//get all current api keys in list
		// let result = await fetch("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": }, "api_key": key, "discord_id": }).then(resp => resp.json())		//create randomly generated key that is not already in database
		//call api to create a record of the api key, along with user and duration
		//return the user, key, and duration in message
		const target = interaction.user.tag
		const duration = interaction.options.getString("duration")
		await interaction.reply(`Target User: ${target}\nDuration: ${duration}\nAdminToken: ${airtable}`);
	},
};