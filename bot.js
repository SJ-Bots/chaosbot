const Discord = require('discord.js');
const chaos = new Discord.Client();

require('dotenv').config();

const token = process.env.token;
const prefix = process.env.prefix;
// const prefix = process.env.prefix;
// const prefix = process.env.prefix;
// const prefix = process.env.prefix;
// const prefix = process.env.prefix;

chaos.on('ready', () => {
  console.log(`Logged in as ${chaos.user.tag}!`);
});

chaos.on('message', (msg) => {});

chaos.login(token);
