const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('../ultils/message.js');

describe('generateMessage function', () => {
	it('Should generate correct message object', () => {
		const From = 'Molly';
		const Text = 'Hello, Can I have a treat?'
		const message = generateMessage(From, Text)

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			From,
			Text
		})
		
	});

});

describe('generateLocationMessage function', () => {
	it('Should generate correct location message object', () => {
		const From = 'Test user'
		const url = 'https://www.google.com/maps?q='
		const lat = 43.8121304
		const lng = -79.2701417

		const locationMessage = generateLocationMessage(From, lat, lng)
		console.log(locationMessage)
		expect(locationMessage.createdAt).toBeA('number');
		expect(locationMessage).toInclude({
			From,
			url: `${url}${lat},${lng}`
		})

	});
});