// 搭建 node.js 集群 （单台服务器的集群，只是充分利用多核）

var http = require('http');
var cluster = require('cluster');
var os = require('os');

var port = 1234;

var cpus = os.cpus().length;
console.log('cpu 内核个数为：' + cpus);

if (cluster.isMaster) {
	// 当前进程为主进程
	for (var i = 0; i < cpus; i++) {
		cluster.fork();
	}

} else {
	// 当前进程为子进程
	var app = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>hello</h1>');
		res.end();
	});

	app.listen(port, function() {
		console.log('server is running at %d', port);
	});
}
