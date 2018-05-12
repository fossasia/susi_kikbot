var request = require("request")

var url = "http://api.susi.ai/susi/chat.json?q=Hi I am Shiven";

request({
    url: url,
    json: true
})