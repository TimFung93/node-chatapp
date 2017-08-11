const socket = io();

socket.on('connect', function() {
	console.log('New User connected to server')
});


socket.on('newMessage', function(newMessage) {
	console.log('new Message received', newMessage)
});


socket.on('disconnect', function() {
	console.log('User was disconnected from server')
});

