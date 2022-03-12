import { Telegraf } from 'telegraf';
import dotenv from 'dotenv'; // .env file
dotenv.config();

// @ts-ignore
const { PORT, APIKEY } = process.env;
console.log(APIKEY);

const bot = new Telegraf(APIKEY as string);

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('hey'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
