var util = require('util');
var http = require('http');
var Bot  = require('@kikinteractive/kik');
var susi= require('./susi.js')
// Configure the bot API endpoint, details for your bot
var bot = new Bot({
    username: process.env.USER_NAME,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.HEROKU_URL
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    susi.ask(message.body,function (answer) {
      message.reply(answer)
    })
});

// Set up your server and start listening
http.createServer(bot.incoming()).listen(process.env.PORT)
