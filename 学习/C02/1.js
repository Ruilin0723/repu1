// var WebSocketSever = require("websocket").server;
// var http = require("http");

// //创建服务器
// var server = http.createServer(function(request,response){
//     console.log((new Date()) + 'Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// //监听服务器
// server.listen(3000,function(){
//     console.log((new Date())+ ' Server is listening on port 3000');
// });
// //创建websocket服务器
// wsServer = new WebSocketSever({
//     httpServer: server
// }); 
// // websocket建立连接
// wsServer.on('rewuest',function(request){
//     //当前的连接
//     var connection = request.accept(null,request.origin);
//     console.log((new Date()) + '已经建立连接.');
//     //监听当前连接  发送message时候，发送信息时候
//     connection.on('message',function(message){
//         if(message.type === 'utf8'){
//             console.log('Received Message:' + message.utf8Data);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if(message.type === 'binary'){
//             console.log('Received Binary Message of' + message.binaryData.length + 'bytes');
//             connection.sendBytes(message.binaryData)
//         }
//     });
//     //监听当前连接  当close 关闭  触发
//     connection.on('close',function(reasonCode,description){
//         console.log((new Date()) + 'Peer' + connection.remoteAddress + '断开连接.');
//     });
// });
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
});
wsServer.on('request', function(request) {
    
    var connection = request.accept('echo-protocol', request.origin);

    setImmediate(function(){
        connection.sendUTF('服务器发送消息' + (new Date()))
    },1000)


    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});