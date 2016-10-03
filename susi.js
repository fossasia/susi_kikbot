const request=require('request')
const askSusi=function (query,cb) {
  request('http://api.asksusi.com/susi/chat.json?q='+encodeURI(query), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(JSON.parse(body).answers[0].actions[0].expression) 
    }else {
      cb('Oops, Looks like Susi is taking a break, She will be back soon')
    }
  })
}

exports.ask=askSusi
