import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv'; // .env file
dotenv.config();

// @ts-ignore
const { PORT, APIKEY } = process.env;
if (APIKEY === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

// Клавиатура
const keyboard = Markup.keyboard([
  Markup.button.pollRequest('Create poll', 'regular'),
  Markup.button.pollRequest('Create quiz', 'quiz'),
]);

const bot = new Telegraf(APIKEY as string);

bot.on('poll', (ctx) => console.log('Poll update', ctx.poll));
bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer));

bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard));

bot.command('poll', (ctx) => ctx.replyWithPoll(
  'Мне нужно',
  ['Оформить землю', 'Разделить/объединить участок', 'Оформить дом', 'Разрешить спор с соседями', 'Узнать, где находится участок'],
  { is_anonymous: false },
));
bot.command('quiz', (ctx) => ctx.replyWithQuiz(
  '2b|!2b',
  ['True', 'False'],
  { correct_option_id: 0 },
));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

//
// bot.start((ctx) => ctx.reply('Welcome!'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('hey'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();
