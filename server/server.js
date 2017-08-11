const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);




app.use(express.static(publicPath))

//lets you resgister an event listener
io.on('connection', (socket) => {
	console.log('New user connected')

	//specify data to the event listener


	socket.on('createMessage', (messageData) => {
		console.log('new message data:', messageData)
		io.emit('newMessage', {
			from: messageData.from,
			text: messageData.text,
			createdAt: new Date().getTime()
		})
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