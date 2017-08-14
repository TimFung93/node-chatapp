const socket = io();



function scrollToBottom() {
	//Selectors
	const messages = jQuery('#messages')
	const newMessage = messages.children('li:last-child')
	//Heights
	const clientHeight = messages.prop('clientHeight')
	const scrollTop = messages.prop('scrollTop')
	const scrollHeight = messages.prop('scrollHeight')
	const newMessageHeight = newMessage.innerHeight()
	const lastMessageHeight = newMessage.prev().innerHeight()

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight)
	}	
};





socket.on('connect', function() {
	const params = jQuery.deparam(window.location.search)

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err)
			window.location.href = '/'
		} else {
			console.log('No error')
		}
	})
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
	scrollToBottom()
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
	scrollToBottom()
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

