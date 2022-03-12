import { Telegraf } from 'telegraf';
import dotEnv from 'dotenv'; // .env file
// import apiKey from './settings';

dotEnv.config();

// @ts-ignore
const port = process.env.PORT;

const bot = new Telegraf('5269770541:AAGSg63rWPvkPpFFuwE6VLt8nJnb0YpBIpU');

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply(''));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
