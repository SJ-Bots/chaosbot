module.exports = {
  name: '\n**管理功能**',
  description: '這只是拿來分類用的\n它毫無作用',
  args: true,
  usage: '<標人或ID>',
  guildOnly: false,
  // cooldown: 0,
  // aliases: [''],
  permissions: 'KICK_MEMBERS',
  needSQL: false,
  authorOnly: false,
  execute(msg, args, prefix, command) {
    msg.channel.send('指令尚未完成!\n無法使用');
  },
};
