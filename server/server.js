const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./ultils/message');
const {isRealString} = require('./ultils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);




app.use(express.static(publicPath))

//lets you resgister an event listener
io.on('connection', (socket) => {
	console.log('New user connected')

	
	

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are requred')
		}

		socket.join(params.room)

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))


		callback()
	});

	//create message is a client side listener
	//specify data to the event listener
	socket.on('createMessage', (messageData, callback) => {
		console.log('new message data:', messageData)
		io.emit('newMessage', generateMessage(messageData.from, messageData.text))
		callback()
	});


	socket.on('createLocationMessage', (locationData) => {
		console.log('new location messsge', locationData)
		io.emit('newLocationMessage', generateLocationMessage('Admin', `${locationData.lat},${locationData.lng}`))
	});


	socket.on('disconnect', () => {
		console.log('User was disconnected from server')
	})
});





// app.get('/', (req,res) => {
// 	res.render('index.html')
// });


server.listen(port, () => {
	console.log(`Server is up on http://localhost:${port}`)
});