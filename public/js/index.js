const socket = io();

socket.on('connect', function() {
	console.log('New User connected to server')
});


socket.on('newMessage', function(newMessage) {
	const formattedTime = moment(newMessage.createdAt).format('h:mm A')
	const messageTemplate = jQuery('#message-template').html()
	const html = Mustache.render(messageTemplate, {
		text: newMessage.Text,
		from: newMessage.From,
		createdAt: formattedTime
	})

	jQuery('#messages').append(html)
});

socket.on('newLocationMessage', function(locationMessage) {
	const formattedTime = moment(locationMessage.createdAt).format('h:mm A')
	const locationMessageTemplate = jQuery('#locationMessage-template').html()
	const html = Mustache.render(locationMessageTemplate, {
		from: locationMessage.From,
		url: locationMessage.url,
		createdAt: formattedTime

	})

	jQuery('#messages').append(html)
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

