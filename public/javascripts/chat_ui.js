	function divEscapedContentElement(message){ //显示系统创建的授信内容,而不是其他用户创建的
		return $('<div></div>').text(message)
	}

	function divSystemContentElement(message){
		return $('<div></div>').html('<i>' + message + '</i>')
	}

	function processUserInput(chatApp,socket){
		var message = $('#send-message').val();
		var systemMessage;

		if(message.charAt(0) == '/'){
			systemMessage = chatApp.processCommand(message);
			if(systemMessage){
				$('#messages').append(divSystemContentElement(systemMessage))
			}
		}else{
			chatApp.sendMessage($('#room').text(),message);
			$('#messages').append(divEscapedContentElement(message))
			$('#messages').scrollTop($('#messages').prop('scrollHeight'));

		}
		$('#send-message').val('');
	}

