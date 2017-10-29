	var socketio = require('socket.io');
	var guestNumber = 1;
	var io;
	var nickNames = {};
	var namesUsed = [];
	var currentRoom = {};

	exports.listen = function(server){
		io = socketio.listen(server);
		io.set('log level',1);
		io.sockets.on('connection',function(socket){
			guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
			joinRoom(socket,'lobby');
			handleMessageBroadcasting(socket,nickNames);
			handleNameChangeAttempts(socket,nickNames,namesUsed);
			handleRoomJoining(socket);

			socket.on('rooms',function(){
				socket.emit('rooms',io.sockets.manager.rooms);
			});

			handleClientDisconnection(socket,nickNames,namesUsed);
		})
	}

	function assignGuestName(socket,guestNumber,nickNames,namesUsed){ //分配用户昵称
		var name = 'Guest' + guestNumber;
		nickNames[socket.id] = name;
		socket.emit('nameResult',{
			success: true,
			name:name
		});
		namesUsed.push(name);
		return guestNumber+1;
	}

	function joinRoom(socket,room){ //user进入chatRoom
		socket.join(room);
		currentRoom[socket.id] = room;
		socket.emit('joinResult',{
			room: room
		})
		socket.broadcast.to(room).emit('messages',{
			text:nickNames[socket.id] + 'has joined' + room +'.'
		})
		var usersInRoom = io.sockets.clients(room);
		if(usersInRoom.length > 1){
			var usersInRoomSummary = 'users currently in the' + room + ':';
			for(var index in usersInRoom){
				var userSocketId = usersInRoom[index].id;
				if(userSocketId != socket.id){
					if(index > 0){
						usersInRoomSummary += ',';
					}
					usersInRoomSummary += nickNames[userSocketId];
				}
			}
			usersInRoomSummary += '.';
			socket.emit('message',{text:usersInRoomSummary})
		 
	}		
}

	function handleNameChangeAttempts(socket,nickNames,namesUsed){ //更改昵称
		socket.on('nameAttemp',function(name){
			if(name.indexOf('Guest') == 0){
				socket.emit('nameResult',{
					success: false,
					message: 'Names can not begin with Guest'
				});
			}else{
				if(namesUsed.indexOf(name) == -1){
					var previousName = nickNames[socket.id];
					var previousNameIndex = namesUsed.indexOf(previousName);
					namesUsed.push(name);
					nickNames[socket.id] = name;
					delete namesUsed[previousName]
					socket.emit('nameResult',{
						success: true,
						name : name
					})
					socket.broadcast.to(currentRoom[socket.id]).emit('message',{
						text: previousName + 'is now known as' + name + '.'
					})
				}else{
					socket.emit('nameResult',{
						success: false,
						message: 'that name is already in use'
					})
				}
			}
		})
	}

	function handleMessageBroadcasting(socket){ //发送聊天信息
		socket.on('message',function(message){
			socket.broadcast.to(message.room).emit('message',{
				text: nickNames[socket.id] + ": "+ message.text
			})
		})
	}

	function handleRoomJoining(socket){ //更换房间
		socket.on('join',function(room){
			socket.leave(currentRoom[socket.id]);
			joinRoom(socket,room.newRoom);
		})
	}
			 
	function handleClientDisconnection(socket){ //断开连接后，清除昵称等
		socket.on('disconnet',function(){
			var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
			delete namesUsed[nameIndex];
			delete nickNames[socket.id];
		})
	}