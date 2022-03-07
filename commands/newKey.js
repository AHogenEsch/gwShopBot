// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
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
		//call api to create a record of the api key, along with user and duration
		//return the user, key, and duration in message

		var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	var key = '';
    	for ( var i = 0; i < 20; i++ ) {
        	key += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    	}

		const target = interaction.user.id;
		const duration = interaction.options.getString("duration");
		var suffix = String(duration).substring(String(duration).length-1);
		var time = parseInt(String(duration).substring(0, String(duration).length-1));
		if(suffix == 'y'){
			time *= 31536600000;
		}
		else if(suffix == 'm'){
			time *= 2592000000;
		}
		else if(suffix == 'w'){
			time *= 604800000;
		}
		else if(suffix == 'd'){
			time *= 86400000;
		}
		else{
			//default expiry
			time = 1663783031450;
		}

		// let result = await fetch("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": airtable}, "api_key": "PlaceHolder123", "discord_id": target}).then(resp => resp.json())		//create randomly generated key that is not already in database
		let result = await axios.post("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": airtable}, "api_key": key, "expire_after": time, "discord_id": target}) //.then(resp => resp.json())
		await interaction.reply(`Target User: ${target}\nDuration: ${time}\nApiKey: ${key}`);
	},
};