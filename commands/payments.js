const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('payments')
		.setDescription('Sends the acceptable payment methods in the order they are preferred'),
	async execute(interaction) {
		await interaction.reply(`Payment methods in the order I prefer recieving them:
		**CASHAPP** \`$GoldenWind0001\` (#1 preferred method)
		LTC: __MDxCYzmAHyCgNugi7eVEtgJHjPC7ZUHQR9__
		BTC: __3MjPYJrFWt6xuVgCzyn6C71tiWfBJK1ZDv__
		ETH: __0x4bBA1d9d2aC1FD006CD86B0348c10D54d8ab38c9__
		SOL: __FKzcnZd6XzEynkiAKKQa16c8P5N8EmAGSuhPFZDBV2EC__
		Paypal: __joshua.linan@yahoo.com__
        Apple Pay and Zelle also accepted ~
        (If you send paypal, you will have to wait for my exchanger to confirm)
        Also taking hypixel gold and various giftcards if under $50

        Ping me once payment is sent with proof of payment`);
	},
};