require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix;
const author = process.env.author;
const master = process.env.master;
// const interactionchannel = process.env.interactionchannel.toString();
const address = process.env.address;
const account = process.env.account;
const password = process.env.password;
const database = process.envdatabase;

const Discord = require('discord.js');
const chaos = new Discord.Client();
const fs = require('fs');
const mysql = require('mysql');

const testdb = mysql.createConnection({
  host: address,
  user: account,
  password: password,
  database: database,
});

testdb.connect((err) => {
  if (err) throw err;
  console.log('正在測試資料庫連線...\n資料庫已成功連線!');
  testdb.end();
  console.log('測試完畢!\n已將資料庫斷線');
});

chaos.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./Extensions');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./Extensions/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./Extensions/${folder}/${file}`);
    chaos.commands.set(command.name, command);
  }
}

chaos.on('ready', () => {
  chaos.user.setPresence({
    activity: {
      name: `Powered by 結城あやの | Using ${prefix}help`,
      type: 'STREAMING',
    },
    status: 'idle',
  });
  console.log(`已登入使用者：${chaos.user.tag}!\n作者：結城あやの`);
});

chaos.on('message', async (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = chaos.commands.get(commandName) || chaos.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  let notcommand = msg.content.replace(`${prefix}`, '');
  if (msg.author.bot) {
    if (!msg.content.startsWith(prefix)) {
      // if (msg.channel.id !== interactionchannel) msg.channel.send(`請至<#${interactionchannel}>使用`);
      return;
      // else {
      // if (msg.content === '標我') chaos.commands.get('標我').execute(msg);
      // else if (msg.content === 'shig') chaos.commands.get('shig').execute(msg);
      // else if (msg.content === 'ui') chaos.commands.get('ui').execute(msg);
      // else if (msg.content === 'skill') chaos.commands.get('skill').execute(msg);
      // else if (msg.content === '日麻') chaos.commands.get('日麻').execute(msg);
      // else if (msg.content === 'shiar') chaos.commands.get('shiar').execute(msg);
      // else if (msg.content === 'vote') chaos.commands.get('vote').execute(msg);
      // else if (msg.content === 'ばかみたい') chaos.commands.get('ばかみたい').execute(msg);
      // else if (msg.content === 'comet') chaos.commands.get('comet').execute(msg);
      // else if (msg.content === '早餐ㄘ啥' || msg.content === '早餐吃啥' || msg.content === '早餐?' || msg.content === '早餐？') chaos.commands.get('早餐').execute(msg);
      // else if (
      //   msg.content === '午餐ㄘ啥' ||
      //   msg.content === '午餐吃啥' ||
      //   msg.content === '午餐?' ||
      //   msg.content === '午餐？' ||
      //   msg.content === '晚餐ㄘ啥' ||
      //   msg.content === '晚餐吃啥' ||
      //   msg.content === '晚餐?' ||
      //   msg.content === '晚餐？'
      // )
      //   chaos.commands.get('餐點').execute(msg);
      // else if (
      //   msg.content === '消夜ㄘ啥' ||
      //   msg.content === '消夜吃啥' ||
      //   msg.content === '消夜?' ||
      //   msg.content === '消夜？' ||
      //   msg.content === '宵夜ㄘ啥' ||
      //   msg.content === '宵夜吃啥' ||
      //   msg.content === '宵夜?' ||
      //   msg.content === '宵夜？'
      // )
      //   chaos.commands.get('消夜').execute(msg);
      // else if (msg.content === '幹話王') chaos.commands.get('幹話王').execute(msg);
      // else if (msg.content === '弟弟') chaos.commands.get('弟弟').execute(msg);
      // else if (msg.content === '') chaos.commands.get('').execute(msg);
      // else if (msg.content === '') chaos.commands.get('').execute(msg);
      // else if (msg.content === '') chaos.commands.get('').execute(msg);
      // else return;
      // }
    } else if (!command) return msg.channel.send(`沒有這條指令：\`${notcommand}\``);
    else {
      if (command.guildOnly && msg.channel.type === 'dm') {
        return msg.reply('這條指令無法在DM執行!');
      }

      if (command.permissions) {
        const authorPerms = msg.channel.permissionsFor(msg.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
          return msg.reply(`您**無法**這麼做\n原因：缺少權限 **${command.permissions}**`);
        }
      }

      if (command.args && !args.length) {
        let reply = `您未提供任何參數!`;

        if (command.usage) {
          reply += `\n這條指令的用法應該要像這樣： \`${prefix}${command.name} ${command.usage}\``;
        }

        return msg.reply(reply);
      }
      if (command.needSQL) {
        try {
          /* const connection = mysql.createConnection({
            host: address,
            user: account,
            password: password,
            database: database,
          });

          connection.connect((err) => {
            if (err) throw err;
            console.log('資料庫已成功連線!');
            command.execute(msg, args, prefix, command, connection);
            console.log('查詢完畢！\n已將資料庫斷線');
            connection.end();
          }); */
          return msg.reply('由於SQL Server尚未上線\n無法使用此功能');
        }
        catch (error) {
          msg.channel.send(`<@${author}>Bot炸啦\n<@${master}>Bot炸啦\n\`\`\`${error}\`\`\``);
        }
      } else if (command.authorOnly) {
        try {
          if (msg.author !== author || msg.author !== master) msg.reply('你不是作者');
          else command.execute(msg, args, prefix, command);
        } catch (error) {
          msg.channel.send(`<@${author}>Bot炸啦\n<@${master}>Bot炸啦\n\`\`\`${error}\`\`\``);
        }
      } else {
        try {
          command.execute(msg, args, prefix, command);
        } catch (error) {
          msg.channel.send(`<@${author}>Bot炸啦\n<@${master}>Bot炸啦\n\`\`\`${error}\`\`\``);
        }
      }
    }
  }
});

chaos.login(token);
