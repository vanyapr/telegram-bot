import { Telegraf } from 'telegraf';
import dotEnv from 'dotenv'; // .env file
dotEnv.config();

// @ts-ignore
const port = process.env.PORT;
const apiKey = process.env.APIKEY;
console.log(apiKey);

const bot = new Telegraf(apiKey as string);

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('hey'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
