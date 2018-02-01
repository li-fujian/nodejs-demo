// 使用 nodejs 实现反向代理
// npm install http-proxy

var http = require('http');
var httpProxy = require('http-proxy');

var port = 1234;

// 创建代理服务器对象并监听错误事件
var proxy = httpProxy.createProxyServer();
proxy.on('error', function (err, req, res) {
	res.write('ERROR!!!');
	res.write(err.toString());
	res.end();
});

var app = http.createServer(function (req, res) {
	// 执行反向代理
	proxy.web(req, res, {
		// target: 'http://127.0.0.1:8080'  // 目标地址
	});
});

app.listen(port, function() {
	console.log('server is running at %d', port);
});