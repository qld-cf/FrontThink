	var http = require('http');
	var fs = require('fs');
	var path = require('path');
	var mime = require('mime');
	var cache = {};

	function send404(response){
		response.writeHead(404,{'Content-Type':'text/plain'});
		response.write('Error 404 :resource not found');
		response.end();
	}

	function sendFile(response,filePath,fileContents){
		response.writeHead(200,{
			"Content-Type": mime.lookup(path.basename(filePath))
		})
		response.end(fileContents)
	}

	function serveStatic(response,cache,absPath){
		if(cache[absPath]){
			sendFile(response,absPath,cache[absPath]); //从内存中返回文件
		}else{
			fs.exists(absPath, function(exists){
				if(exists){
					fs.readFile(absPath,function(err,data){
						if(err){
							send404(response)
						}else{
							cache[absPath] = data;
							sendFile(response,absPath,data);
						}
					})
				}else{
					send404(response);
				}
			});
		}
	}

	var server = http.createServer(function(request,response){
		var filePath = false;
		if(request.url == '/'){
			filePath = 'public/index.html'
		}else{
			filePath = 'public' + request.url
		}
		var absPath = './' + filePath;
		serveStatic(response,cache,absPath);
	})

	server.listen(3000,function(){
		console.log('Serve online');
	})

	//调用chat_serve里面的函数，处理基于socket.io的服务端聊天功能
	var chatServer = require('./lib/chat_server');
	chatServer.listen(server)


