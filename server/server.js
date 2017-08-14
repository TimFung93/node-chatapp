const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./ultils/message');
const {isRealString} = require('./ultils/validation');
const {Users} = require('./ultils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();



app.use(express.static(publicPath))

//lets you resgister an event listener
io.on('connection', (socket) => {
	console.log('New user connected')

	
	

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are requred')
		}

		socket.join(params.room)
		users.removeUser(socket.id)
		users.addUser(socket.id, params.name, params.room)

		io.to(params.room).emit('updateUserList', users.getUserList(params.room))

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
		callback()
	});

	//create message is a client side listener
	//specify data to the event listener
	socket.on('createMessage', (messageData, callback) => {
		const user = users.getUser(socket.id)

		if (user && isRealString(messageData.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, messageData.text))
		}
		
		callback()
	});


	socket.on('createLocationMessage', (locationData) => {
		const user = users.getUser(socket.id)

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, `${locationData.lat},${locationData.lng}`))
		}

		
	});


	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id)

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room))
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`))
		}
	})
});





// app.get('/', (req,res) => {
// 	res.render('index.html')
// });


server.listen(port, () => {
	console.log(`Server is up on http://localhost:${port}`)
});