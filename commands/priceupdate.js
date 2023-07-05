const { SlashCommandBuilder } = require('@discordjs/builders');
const {cacPrice, pbsPrice, fedPrice, vilPrice, gemPrice, jwlPrice} = require('../prices.json');
const fs = require('fs');
const fileName = '../prices.json';
const file = require(fileName);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('priceupdate')
		.setDescription('Updates the prices for items')
		.addStringOption(prices =>
			prices.setName('prices')
			.setDescription('price changes')
			.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply()

		if(interaction.member.permissions.has('ADMINISTRATOR')){

			var purePrices = [cacPrice, pbsPrice, fedPrice, vilPrice, gemPrice, jwlPrice];
			var priceChange = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

			const userPrices = interaction.options.getString('prices');
			var response = '';
			var couldntRead = '';

			var prices = userPrices.split(" ");
			for(const ord of prices){
				var type = ord.substring(ord.length-3);
				var change = parseFloat(ord.substring(0, ord.length-3));
				if(type == 'cac'){
					priceChange[0] += change;
					file.cacPrice = purePrices[0] + priceChange[0];
				}
				else if(type == 'pbs'){
					priceChange[1] += change;
					file.pbsPrice = purePrices[1] + priceChange[1];
				}
				else if(type == 'fed'){
					priceChange[2] += change;
					file.fedPrice = purePrices[2] + priceChange[2];
				}
				else if(type == 'vil'){
					priceChange[3] += change;
					file.vilPrice = purePrices[3] + priceChange[3];
				}
				else if(type == 'gem'){
					priceChange[4] += change;
					file.gemPrice = purePrices[4] + priceChange[4];
				}
				else if(type == 'jwl'){
					priceChange[5] += change;
					file.jwlPrice = purePrices[5] + priceChange[5];
				}
				else{
					couldntRead += `${change}${type},`;
				}
			}
			//Writing new prices to prices.json					
			const content = JSON.stringify(file);
			console.log(content);
			// console.log("Writing to " + fileName)
			try{
				fs.writeFileSync(fileName, content);
			}
			catch (err){
				console.log(err); 
			}
			// fs.writeFile(fileName, content, (err) => { if (err) return console.log(err); });
		
			await new Promise(resolve => setTimeout(resolve, 1500));


			var pureEmojis = [`${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PhiloCac')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PB')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Fedur')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'vile')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Gem')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'JewelSword')}`];

			for(var i = 0; i < 6; i++ ){
				if(priceChange[i] > 0.0){
					response += `${pureEmojis[i]} :arrow_up: ${priceChange[i]}, is now **${purePrices[i] + priceChange[i]}**\n`
				}
			}
			for(var i = 0; i < 6; i++ ){
				if(priceChange[i] < 0.0){
					response += `${pureEmojis[i]} :arrow_down: ${priceChange[i]}, is now **${purePrices[i] + priceChange[i]}**\n`
				}
			}
			if(response == ''){
				response += 'Please use the suffixes cac, pbs, fed, vil, gem, jwl\nExample: /priceupdate 10pbs 1vil 4jwl';
			}
			if(couldntRead){
				response += `Could not read: ${couldntRead.substring(0, couldntRead.length - 1)}`
			}
			await interaction.followUp(response);
		}
	},
};