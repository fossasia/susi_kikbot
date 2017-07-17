const request=require('request')
const askSusi=function (query,cb) {
  request('http://api.asksusi.com/susi/chat.json?q='+encodeURI(query), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
		message = '';
		if(data.answers[0].actions[1]){
			if(data.answers[0].actions[1].type === 'rss'){
				message += 'I found this on the web-:\n\n'
				for(var i=0;i<(data.answers[0].metadata.count);i++){
						message += ('Title : ');
						message += data.answers[0].data[i].title+', ';
						message += ('Link : ');
						message += data.answers[0].data[i].link+', ';
					message += '\n\n';
				}
			}
		}
		else{
			if(data.answers[0].actions[0].type === 'table'){
				var colNames = data.answers[0].actions[0].columns;
				if((data.answers[0].metadata.count)>20)
					message += 'Due to message limit, only some results are shown-:\n\n';
				else
					message += 'Results are shown below-:\n\n';
				for(var i=0;i<(((data.answers[0].metadata.count)>20)?20:data.answers[0].metadata.count);i++){
					for(var cN in colNames){
						message += (colNames[cN]+' : ');
						message += data.answers[0].data[i][cN]+', ';
					}
					message += '\n\n';
				}
			}
			else
			{
				message = data.answers[0].actions[0].expression;
			}
		} 
      	cb(message); 
    }
    else {
      cb('Oops, Looks like Susi is taking a break, She will be back soon')
    }
  })
}

exports.ask=askSusi
