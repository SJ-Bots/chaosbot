const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(msg, args, prefix, connection, command) {
		const waiting = await msg.channel.send('正在檢測延遲');
		const ping = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Pong!')
			.setDescription(`延遲${0 - (Date.now() - msg.createdTimestamp)}ms.`)
			.setFooter('Copyright © 結城あやの From SJ Bots');
		await msg.channel.send(ping);
		await waiting.delete({ timeout: 1000 });
	},
};
