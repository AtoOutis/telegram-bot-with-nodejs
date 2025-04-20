const bot = require('../bot'); // make sure path is correct

export default async function handler(req, res) {
    if (req.method === 'POST') {
        bot.processUpdate(req.body);
        return res.status(200).send('OK');
    } else {
        res.status(200).send('Bot is running!');
    }
}
