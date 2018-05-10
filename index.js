var http = require('http');
var Bot  = require('@kikinteractive/kik');
var susi= require('./susi.js');

var bot = new Bot({
    username: process.env.KIK_BOT_USERNAME,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL
});

setInterval(function() {
		http.get(process.env.HEROKU_URL);
	}, 1200000);
	
bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    susi.ask(message.body,function (answer) {
      message.reply(answer)
    })
});


http.createServer(bot.incoming()).listen(process.env.PORT || 8080)
