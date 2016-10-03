var util = require('util');
var http = require('http');
var Bot  = require('@kikinteractive/kik');
var susi= require('./susi.js')
// Configure the bot API endpoint, details for your bot
var bot = new Bot({
    username: 'loklaksusi',
    apiKey: 'ea6456c7-48aa-4718-af8d-0100b3e3422e',
    baseUrl: 'https://loklaksusii.herokuapp.com'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    susi.ask(message.body,function (answer) {
      message.reply(answer)
    })
});

// Set up your server and start listening
http.createServer(bot.incoming()).listen(process.env.PORT)
