// 最简单的 web 应用
// 可以转跳到一个html页面 (http://127.0.0.1:1234/a.html)

var http = require('http');
var fs = require('fs');  // 文件操作模块

var port = 1234;

var app = http.createServer(function (req, res) {
	var path = __dirname + req.url;

	fs.readFile(path, function (err, data) {
		if (err) {
			res.end();
			return;
		}

		res.write(data.toString());
		res.end();
	});

});

app.listen(port, function() {
	console.log('server is running at %d', port);
});

