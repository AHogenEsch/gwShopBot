const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { oofauth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletekey')
		.setDescription('Deletes Keys')
		.addSubcommand(subcommand =>
            subcommand.setName('api_key')
            .setDescription('Deleting one key')
            .addStringOption(option => option.setName('key').setDescription('Key to be deleted').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('user')
            .setDescription('Deleted all keys of a user')
            .addUserOption(option => option.setName('target').setDescription('Target who\s keys will be deleted').setRequired(true))),
	async execute(interaction) {
	
        if(interaction.options.getSubcommand() === "api_key"){
            const key = interaction.options.getString('key');
            if(key){
                var keys = [key];
                let result = await axios.post('http://164.92.65.15:5000/delete_autogrinder', {api_keys: keys}, {headers:{"OofAuth": oofauth}});
                await interaction.reply(`${keys} Deleted`);
            }
        }

        else if(interaction.options.getSubcommand() === "user"){
            const target = interaction.options.getUser('target');
            if(target){
                var keys2 = [];
                var delKeys = [];
                let result = await axios.post('http://164.92.65.15:5000/list_autogrinder', {discord_id: target.id}, {headers:{"OofAuth": oofauth}}).then(resp => {keys2 = resp.data}); 
                for(const key of keys2["keys"]){
                    delKeys.push(key["key"])
                };
                let resultTwo = await axios.post('http://164.92.65.15:5000/delete_autogrinder', {api_keys: delKeys}, {headers:{"OofAuth": oofauth}});
                await interaction.reply(`${delKeys}\nDeleted`);
            }
            else{
                await interaction.reply('Enter a User')
            }
        }
        else{
            await interaction.reply('Wrong Format for deletekey');
        }
	},
};