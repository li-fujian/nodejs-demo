// 最简单的 web 应用

var http = require('http');
var port = 1234;

var app = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>hello</h1>');
	res.end();
});

app.listen(port, function() {
	console.log('server is running at %d', port);
});
