// 引入 HTTP 函数模块; 字符串查询模块，用于解析与格式化 URL 查询字符串。
var http = require('http');
var querystring = require('querystring');

// 创建一个Server
var server = http.createServer();
// 设置 'request' 事件监听，当有请求时即触发requestFunction方法
server.on('request',requestFunction); 

var requestFunction = function (req, res){
    if(req.url == '/'){ // 请求为根路径时，返回一个页面
        return firstPage(res);
    }
    if(req.url == '/login'){
        if (req.method != 'POST'){
            return;
        }
        return login(req, res)
    }
}

var firstPage = function(response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    var html = '<html><body>'+
        '<form action="/login" method="post">'+
        'name:<input type="text" name="name"> </br>'+
        'password:<input type="password" name="pwd"></br>'+
        '<input type="submit" value="login">'+
        '</form>'+
        '</body></html>';
    response.end(html);  // 该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。
}  

var login = function(req, res) {
    var info ='';
    req.addListener('data', function(chunk){
        info += chunk;  
     })
    .addListener('end', function(){
        info = querystring.parse(info);  // 'foo=bar&abc=xyz&abc=123' 会被解析成 {foo: 'bar',abc: ['xyz', '123']}
        if(info.name == 'a' && info.pwd =='1'){
            res.end('login success ' + info.name);
        }else{
            res.end('login failed ' + info.name); 
        }
     })
}


server.listen(1337, "127.0.0.1");  
  
console.log('Server running at http://127.0.0.1:1337/'); 