const moment = require('moment');



const generateMessage = (From, Text) => {
	return {
		From,
		Text,
		createdAt: moment().valueOf()
	}
};

const generateLocationMessage = (From, lat, lng) => {
	return {
		From,
		url: `https://www.google.com/maps?q=${lat},${lng}`,
		createdAt: moment().valueOf()
	}
};



module.exports = {
	generateMessage,
	generateLocationMessage
};

