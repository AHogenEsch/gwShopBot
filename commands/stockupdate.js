const { SlashCommandBuilder } = require('@discordjs/builders');
const {cacCount, pbsCount, fedCount, vilCount, gemCount, jwlCount} = require('../stock.json');
const fs = require('fs');
const fileName = '../stock.json';
const file = require(fileName);
// const storage_uuid = require('../config.json');
const axios = require('axios');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('stockupdate')
		.setDescription('Updates the stock for pure')
		.addStringOption(stock =>
			stock.setName('stock')
			.setDescription('manual stock input')
			.setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply()
        const storage_igns = ["pantsbundles", "catboycletus"]

		if(interaction.member.permissions.has('ADMINISTRATOR')){

            

            if(interaction.options.getString('stock')){
                var pureCounts = [cacCount, pbsCount, fedCount, vilCount, gemCount, jwlCount];
                const userCounts = interaction.options.getString('stock');
                var couldntRead = '';

                var counts = userCounts.split(" ");
                for(const ord of counts){
                    var type = ord.substring(ord.length-3);
                    var count = parseFloat(ord.substring(0, ord.length-3));
                    if(type == 'cac'){
                        pureCounts[0] = count;
                        file.cacCount = count;
                    }
                    else if(type == 'pbs'){
                        pureCounts[1] = count;
                        file.cacCount = count;
                    }
                    else if(type == 'fed'){
                        pureCounts[2] = count;
                        file.cacCount = count;
                    }
                    else if(type == 'vil'){
                        pureCounts[3] = count;
                        file.cacCount = count;
                    }
                    else if(type == 'gem'){
                        pureCounts[4] = count;
                        file.cacCount = count;
                    }
                    else if(type == 'jwl'){
                        pureCounts[5] = count;
                        file.cacCount = count;
                    }
                    else{
                        couldntRead += `${count}${type}, `;
                    }
                }
            }
            //Checking pantsbundles (db102a271aa04494be3c89accb4d7488)
            else{
                var pureCounts = [0, 0, 0, 0, 0, 0];
                var pitData;
                //cacCount, pbsCount, fedCount, vilCount, gemCount, jwlCount
                for(ign of storage_igns){
                    let pitPandaReq = await axios.get(`https://pitpanda.rocks/api/players/${ign}`).then(resp => {
                            pitData = resp.data.data
                        }).catch(function (error) {
                            console.log(error)
                        })

                        await new Promise(resolve => setTimeout(resolve, 1500));
                        //inventory
                        for(slot of pitData.inventories.main){
                            var slotName = ''
                            if(slot["name"]){
                                slotName = `${slot["name"]}`
                            }
                            if(slotName.includes("Philosopher's Cactus")){
                                pureCounts[0] += slot["count"]
                            }
                            else if(slotName.includes("Bundle")){
                                pureCounts[1] += 1
                            }
                            else if(slotName.includes("Funky")){
                                pureCounts[2] += slot["count"]
                            }
                            else if(slotName.includes("Vile")){
                                pureCounts[3] += slot["count"]
                            }
                            else if(slotName.includes("Gem")){
                                pureCounts[4] += slot["count"]
                            }
                            else if(slotName.includes("Uberdrop")){
                                if(slot["desc"]["1"].includes("Cactus")){
                                    if(slot["desc"]["1"].includes("5")){
                                        pureCounts[0] += 5;
                                    }
                                    else if(slot["desc"]["1"].includes("10")){
                                        pureCounts[0] += 10;
                                    }
                                    else if(slot["desc"]["1"].includes("15")){
                                        pureCounts[0] += 15;
                                    }
                                    else if(slot["desc"]["1"].includes("20")){
                                        pureCounts[0] += 20;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Feather")){
                                    if(slot["desc"]["1"].includes("1")){
                                        pureCounts[2] += 1;
                                    }
                                    else if(slot["desc"]["1"].includes("2")){
                                        pureCounts[2] += 2;
                                    }
                                    else if(slot["desc"]["1"].includes("33")){
                                        pureCounts[2] += 3;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Gem")){
                                    pureCounts[4] += 1
                                }
                                if(slot["desc"]["1"].includes("Hidden")){
                                    pureCounts[5]  += 1
                                }
                            }
                        }
                        //echest
                        for(slot of pitData.inventories.enderchest){
                            var slotName = ''
                            if(slot["name"]){
                                slotName = `${slot["name"]}`
                            }
                            if(slotName.includes("Philosopher's Cactus")){
                                pureCounts[0] += slot["count"]
                            }
                            else if(slotName.includes("Bundle")){
                                pureCounts[1] += 1
                            }
                            else if(slotName.includes("Funky")){
                                pureCounts[2] += slot["count"]
                            }
                            else if(slotName.includes("Vile")){
                                pureCounts[3] += slot["count"]
                            }
                            else if(slotName.includes("Gem")){
                                pureCounts[4] += slot["count"]
                            }
                            else if(slotName.includes("Uberdrop")){
                                if(slot["desc"]["1"].includes("Cactus")){
                                    if(slot["desc"]["1"].includes("5")){
                                        pureCounts[0] += 5;
                                    }
                                    else if(slot["desc"]["1"].includes("10")){
                                        pureCounts[0] += 10;
                                    }
                                    else if(slot["desc"]["1"].includes("15")){
                                        pureCounts[0] += 15;
                                    }
                                    else if(slot["desc"]["1"].includes("20")){
                                        pureCounts[0] += 20;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Feather")){
                                    if(slot["desc"]["1"].includes("1")){
                                        pureCounts[2] += 1;
                                    }
                                    else if(slot["desc"]["1"].includes("2")){
                                        pureCounts[2] += 2;
                                    }
                                    else if(slot["desc"]["1"].includes("33")){
                                        pureCounts[2] += 3;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Gem")){
                                    pureCounts[4] += 1
                                }
                                if(slot["desc"]["1"].includes("Hidden")){
                                    pureCounts[5]  += 1
                                }
                            }
                        }
                        //stash
                        for(slot of pitData.inventories.stash){
                            var slotName = ''
                            if(slot["name"]){
                                slotName = `${slot["name"]}`
                            }
                            if(slotName.includes("Philosopher's Cactus")){
                                pureCounts[0] += slot["count"]
                            }
                            else if(slotName.includes("Bundle")){
                                pureCounts[1] += 1
                            }
                            else if(slotName.includes("Funky")){
                                pureCounts[2] += slot["count"]
                            }
                            else if(slotName.includes("Vile")){
                                pureCounts[3] += slot["count"]
                            }
                            else if(slotName.includes("Gem")){
                                pureCounts[4] += slot["count"]
                            }
                            else if(slotName.includes("Uberdrop")){
                                if(slot["desc"]["1"].includes("Cactus")){
                                    if(slot["desc"]["1"].includes("5")){
                                        pureCounts[0] += 5;
                                    }
                                    else if(slot["desc"]["1"].includes("10")){
                                        pureCounts[0] += 10;
                                    }
                                    else if(slot["desc"]["1"].includes("15")){
                                        pureCounts[0] += 15;
                                    }
                                    else if(slot["desc"]["1"].includes("20")){
                                        pureCounts[0] += 20;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Feather")){
                                    if(slot["desc"]["1"].includes("1")){
                                        pureCounts[2] += 1;
                                    }
                                    else if(slot["desc"]["1"].includes("2")){
                                        pureCounts[2] += 2;
                                    }
                                    else if(slot["desc"]["1"].includes("33")){
                                        pureCounts[2] += 3;
                                    }
                                }
                                if(slot["desc"]["1"].includes("Gem")){
                                    pureCounts[4] += 1
                                }
                                if(slot["desc"]["1"].includes("Hidden")){
                                    pureCounts[5]  += 1
                                }
                            }
                        }
                    }
                file.cacCount = pureCounts[0];
                file.pbsCount = pureCounts[1];
                file.fedCount = pureCounts[2];
                file.vilCount = pureCounts[3];
                file.gemCount = pureCounts[4];
                file.jwlCount = pureCounts[5];
            }




			//Writing new prices to prices.json					
			const content = JSON.stringify(file)
			console.log(content);
			fs.writeFileSync(__dirname + "/" + fileName, content, console.error);

		
			await new Promise(resolve => setTimeout(resolve, 1500));

            if(couldntRead){
				await interaction.followUp(`Could not read: ${couldntRead.substring(0, couldntRead.length - 2)}`)
			}
            else{
                await interaction.followUp(`${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PhiloCac')} - ${pureCounts[0]} or ${(pureCounts[0] / 64).toFixed(2)} stacks\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PB')} - ${pureCounts[1]}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Fedur')} - ${pureCounts[2]}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'vile')} - ${pureCounts[3]} or ${(pureCounts[3] / 64).toFixed(2)} stacks\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Gem')} - ${pureCounts[4]}\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'JewelSword')} - ${pureCounts[5]}`)
            }
            
		
		}
        else{
            await interaction.followUp("Did you mean /stock ?");
        }
	},
};