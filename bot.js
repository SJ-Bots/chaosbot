const Discord = require('discord.js');
const chaos = new Discord.Client();

require('dotenv').config();

const token = process.env.token;
const prefix = process.env.prefix;
// const address = process.env.address;
// const account = process.env.account;
// const password = process.env.password;
// const database = process.env.database;

chaos.on('ready', () => {
  console.log(`Logged in as ${chaos.user.tag}!`);
});

chaos.on('message', (msg) => {});

chaos.login(token);
