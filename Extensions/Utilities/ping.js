const Discord = require('discord.js');
module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false,
  // usage: '',
  guildOnly: false,
  // cooldown: 0,
  // aliases: [''],
  // permissions: '',
  needSQL: true,
  authorOnly: false,
  async execute(msg, args, prefix, command) {
    const waiting = await msg.channel.send('正在檢測延遲');
    const ping = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pong!')
      .setDescription(`延遲${Math.abs(Date.now() - msg.createdTimestamp)}ms.`)
      .setFooter('Copyright © 結城あやの From SJ Bots');
    await msg.channel.send(ping);
    await waiting.delete({ timeout: 1000 });
  },
};
