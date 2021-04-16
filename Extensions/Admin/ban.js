module.exports = {
  name: 'ban',
  description: '將某人永久除名',
  args: true,
  usage: '<標人或ID>',
  guildOnly: true,
  // cooldown: 0,
  // aliases: [''],
  permissions: 'BAN_MEMBERS',
  needSQL: false,
  authorOnly: false,
  execute(msg, args, prefix, command) {
    msg.channel.send('指令尚未完成!\n無法使用');
  },
};
