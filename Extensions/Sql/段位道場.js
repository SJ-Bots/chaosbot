module.exports = {
  name: 'taikodan',
  description: '查詢等級帶歌曲',
  args: true,
  usage: '<難度> <等級>',
  guildOnly: false,
  //   cooldown: 0,
  aliases: ['dan'],
  //   permissions: '',
  execute(msg, args, prefix, connection, command) {
    msg.channel.send('資料庫尚未完善\n無法使用本指令');
  },
};
