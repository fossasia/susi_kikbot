var http = require('http');
var Bot  = require('@kikinteractive/kik');
var susi= require('./susi.js');
var request = require("request");

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
    var chatID = message.chatId;
    var Username;
    bot.getUserProfile(message.from).then((user) => {
        Username = user.username;
    });


    susi.ask(message.body,function (answer, type) {
        if(type === "photo"){
            request.post({
                url: "https://api.kik.com/v1/message",
                auth: {
                    user: process.env.KIK_BOT_USERNAME,
                    pass: process.env.API_KEY
                },
                json: {
                    "messages": [
                    {
                        "chatId": chatID,
                        "type": "picture",
                        "to": Username,
                        "picUrl": answer
                    }
                    ]
                }
            });
        }
        else {
            message.reply(answer);
        }
    })
});

let port = process.env.PORT || 8080;
let server = http
    .createServer(bot.incoming())
    .listen(port);
