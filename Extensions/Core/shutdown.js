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
  needSQL: false,
  authorOnly: true,
  async execute(msg, args, prefix, command) {
    await msg.reply('Goodbye!');
    process.exit(0);
  },
};
