import { Composer, Markup, Scenes, session, Telegraf } from 'telegraf';
import dotenv from 'dotenv'; // .env file
dotenv.config();

// @ts-ignore
const { PORT, APIKEY } = process.env;
if (APIKEY === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(APIKEY as string);

const stepHandler = new Composer<Scenes.WizardContext>();
stepHandler.action('next', async (ctx) => {
  await ctx.reply('Step 2. Via inline button');
  return ctx.wizard.next();
});
stepHandler.command('next', async (ctx) => {
  await ctx.reply('Step 2. Via command');
  return ctx.wizard.next();
});
stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'));

const superWizard = new Scenes.WizardScene(
  'super-wizard',
  async (ctx) => {
    await ctx.reply(
      'Step 1',
      Markup.inlineKeyboard([
        Markup.button.url('❤️', 'http://telegraf.js.org'),
        Markup.button.callback('➡️ Next', 'next'),
      ]),
    );
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    await ctx.reply('Step 3');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Step 4');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Done');
    return await ctx.scene.leave();
  },
);

const bot = new Telegraf<Scenes.WizardContext>(token);
const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
  default: 'super-wizard',
});
bot.use(session());
bot.use(stage.middleware());
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
