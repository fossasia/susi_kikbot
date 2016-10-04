var http = require('http');
var Bot  = require('@kikinteractive/kik');
var susi= require('./susi.js')

var bot = new Bot({
    username: 'loklaksusi',
    apiKey: process.env.API_KEY,
    baseUrl: process.env.HEROKU_URL || 'https://loklaksusii.herokuapp.com'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    susi.ask(message.body,function (answer) {
      message.reply(answer)
    })
});


http.createServer(bot.incoming())
    .listen(process.env.PORT||5000)
