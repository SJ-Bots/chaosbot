module.exports = {
  name: 'taiko',
  description: '查詢等級帶歌曲',
  args: true,
  usage: '<難度> <等級>',
  guildOnly: false,
  // cooldown: 0,
  // aliases: [''],
  // permissions: '',
  needSQL: true,
  authorOnly: false,
  execute(msg, args, prefix, command, connection) {
    msg.channel.send('資料庫尚未完善\n無法使用本指令');
  },
};
