module.exports = {
  name: 'help',
  description: '顯示指令幫助',
  aliases: ['h', 'commands'],
  usage: '[指令名稱]',
  execute(msg, args, prefix) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push('這是我能使用的指令列表(部分為反映指令無須前綴即可觸發):\n');
      data.push(commands.map((command) => command.name).join('\n'));
      data.push(`使用\`${prefix}help [指令名稱]\`獲得指令詳細說明`);
      // msg.channel.send(data, { split: true });
      return msg.author
        .send(data, { split: true })
        .then(() => {
          if (msg.channel.type === 'dm') return;
          msg.reply('我已經將所有指令私訊給你');
        })
        .catch((error) => {
          console.error(`傳送指令列表給${msg.author.tag}失敗！\n`, error);
          msg.reply('我無法將指令列表私訊給你！\n你是不是關閉了非好友私訊？');
        });
    } else {
      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return msg.reply('沒有這條指令');
      }

      data.push(`**指令名稱:** ${command.name}`);

      if (command.aliases) data.push(`**指令別名:**${command.aliases.join(', ')}`);
      if (command.description) data.push(`**說明:**${command.description}`);
      if (command.usage) data.push(`**使用方法:**${prefix}${command.name} ${command.usage}`);
      if (command.cooldown) data.push(`**冷卻時間:**${command.cooldown}秒`);

      // msg.channel.send(data, { split: true });
    }
  },
};
