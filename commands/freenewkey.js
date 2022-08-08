// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { oofauth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('freenewkey')
		.setDescription('Creates new Key for free version')
		.addUserOption(option =>
			option.setName('target')
			.setDescription('The user the key is for')
			.setRequired(true)),
	async execute(interaction) {
		//get all current api keys in list
		//call api to create a record of the api key, along with user and duration
		//return the user, key, and duration in message
		const target = interaction.options.getUser('target');

		var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	var key = '';
    	for ( var i = 0; i < 10; i++ ) {
        	key += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    	}
    	key = String(target.tag).substring(0, String(target.tag).length-5).toUpperCase() + "vFree" + key;

		const duration = 0;

		// let result = await fetch("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": airtable}, "api_key": "PlaceHolder123", "discord_id": target}).then(resp => resp.json())		//create randomly generated key that is not already in database
		let result = await axios.post('http://164.92.65.15:5000/add_autogrinder', {api_key: key, expire_after: duration, discord_id: target.id}, {headers:{"OofAuth": oofauth}}) //.then(resp => resp.json())
		await interaction.reply(`Free Key:\nTarget User: <@${target.id}>\nApiKey: ${key}`);
	},
};