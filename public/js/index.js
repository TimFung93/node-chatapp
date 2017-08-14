const socket = io();

socket.on('connect', function() {
	console.log('New User connected to server')
});


socket.on('newMessage', function(newMessage) {
	const formattedTime = moment(newMessage.createdAt).format('h:mm A')

	let li = jQuery('<li></li>')
	li.text(`${newMessage.From} ${formattedTime}: ${newMessage.Text}`)

	jQuery('#messages').append(li)
});

socket.on('newLocationMessage', function(locationMessage) {
	const formattedTime = moment(locationMessage.createdAt).format('h:mm A')
	let li = jQuery('<li></li>')
	let a = jQuery('<a target="_blank">My current location</a>')
	
	li.text(`${locationMessage.From}: ${formattedTime}  `)
	a.attr('href', locationMessage.url)
	li.append(a)
	jQuery('#messages').append(li)
});


socket.on('disconnect', function() {
	console.log('User was disconnectd from server')
});


jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	const messageTextbox = jQuery('[name=message]')
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('')
	})
});

const locationButton = jQuery('#send-location').on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser')
	}

	locationButton.attr('disabled', 'disabled').text('Sending Location...')

	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send Location')
		socket.emit('createLocationMessage', {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		})
	}, function(err) {
		locationButton.removeAttr('disabled').text('Send Location')
		alert('unable to fetch location')
	});
})

