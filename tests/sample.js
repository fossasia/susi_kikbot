var request = require("request")

var url = "http://api.asksusi.com/susi/chat.json?q=Hi I am Shiven"

request({
    url: url,
    json: true
})