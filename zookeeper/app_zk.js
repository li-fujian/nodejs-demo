// 使用 node 客户端连接 Zookeeper. 注意，此客户端仅提供异步方式
// https://www.npmjs.com/package/node-zookeeper-client
// npm install node-zookeeper-client

var zookeeper = require('node-zookeeper-client');

var connection_string = '127.0.0.1:2181';

var options = {
	sessionTimeout: 5000
};

var zk = zookeeper.createClient(connection_string, options);

zk.on('connected', function () {
	console.log(zk);
});

zk.on('connected', function () {
	console.log(zk);
});

zk.on('disconnected', function () {
	console.log('---game over---');
});

// 监控节点变化
zk.getChildren('/', function (event) {
	console.log('Got watcher event: %s', event.getName());
}, function (error, children, stat) {

});

zk.connect();

// 创建节点。默认无ACL权限，默认持久节点
zk.create('/foo', new Buffer('hello'), function (err, path) {
	console.log('创建节点。path：' + path);
});

// 列出子节点
zk.getChildren('/', function (err, children, stat) {
	if (err) {
		console.log(err.stack);
		return;
	};
	console.log('列出子节点，children：' +　children);
});

// 判断节点是否存在
zk.exists('/foo', function (err, stat) {
	if (stat) {
		console.log('节点存在');
	} else {
		console.log('节点不存在');
	}
});

// 获取节点数据
zk.getData('/foo', function (err, data, stat) {
	console.log('获取节点数据。data:' + data.toString());
});

// 更新节点数据
zk.setData('/foo', new Buffer('world'), function (err, stat) {
	console.log('更新节点数据。stat:' + stat);
});

// 删除节点
zk.remove('/foo', function (err) {
	if (!err) {
		console.log('删除节点成功。');
	}
});

setTimeout(function () {
	zk.close();
}, 2000);
