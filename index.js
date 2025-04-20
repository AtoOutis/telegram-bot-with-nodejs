require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = process.env.TOKEN;
const bot = new TelegramBot(token);
const app = express();

// Middleware
app.use(express.json());

// Webhook endpoint - Vercel uses /api routes
app.post('/api/webhook', (req, res) => {
    bot.processUpdate(req.body);
    return res.status(200).send('OK');
});

// Health check
app.get('/api', (req, res) => {
    res.json({ status: 'Bot active' });
});

// Set webhook route (call this manually after deploy)
app.get('/api/set-webhook', async (req, res) => {
    const url = `https://${req.headers.host}/api/webhook`;
    await bot.setWebHook(url);
    res.json({ url, status: 'Webhook set' });
});

// Bot logic
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `You said: ${msg.text}`)
        .catch(console.error);
});

// Export for Vercel
module.exports = app;