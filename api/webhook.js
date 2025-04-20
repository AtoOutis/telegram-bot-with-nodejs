const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;

        // Reply to user
        if (body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text;

            await bot.sendMessage(chatId, `You said: ${text}`);
        }

        return res.status(200).send('OK');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};


