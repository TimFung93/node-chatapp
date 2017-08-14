const expect = require('expect');

const {isRealString} = require('../ultils/validation');



describe('isRealString function', () => {
	it('Should accept a valid string', () => {
		const validString = 'Room'
		const isString = isRealString(validString)

		expect(isString).toBe(true)
	})

	it('Should reject non-string values', () => {
		const number = 1234
		const isString = isRealString(number)


		expect(isString).toBe(false)
	}) 
	
	it('Should reject strings with only spaces', () => {
		const space = '      '
		const isString = isRealString(space)

		expect(isString).toBe(false)
	}) 
	
	it('Should accept string with non-space characters', () => {
		const validStringWithSpace = 'Star Wars'
		const isString = isRealString(validStringWithSpace)

		expect(isString).toBe(true)
	}) 
});