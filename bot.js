const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { webhook: { port: false } }); // no internal server

// Telegram message handling
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `You said: ${msg.text}`);
});

module.exports = bot;
