// backend/server.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Create a new Telegram bot instance using the token from environment variables
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Command handler for /healthcare command
bot.onText(/\/healthcare/, (msg) => {
    const chatId = msg.chat.id;
    // Send a message with a link to the health care page
    bot.sendMessage(chatId, 'Here is the health care page: https://health-chain-five.vercel.app/');
});

// Log when the bot is ready
bot.on('polling_error', (error) => {
    console.log(error);  // Handle potential errors
});

console.log('Bot is running...');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Example route
app.get('/', (req, res) => {
    res.send('Welcome to my app');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
