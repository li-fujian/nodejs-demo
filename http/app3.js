// 使用 express 框架搭建 Web 应用

var express = require('express');

var port = 1234;

var app = express();

app.use(express.static('.'));  // 加载 static 中间件，该中间件用于处理所有的静态资源（. 表示当前路径）

// express 提供了简单的路由功能.
// 可处理 post put delete. 可用all() 处理所有类型的请求。可用 * 通配符通配
app.get('/hello', function(req, res){
	res.send('hello');
});

app.listen(port, function() {
	console.log('server is running at %d', port);
});

