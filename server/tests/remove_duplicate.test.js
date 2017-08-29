const expect = require('expect');

const {remove_duplicate} = require('../ultils/remove_duplicate');

describe('remove_duplicate function', () => {
	it('Should remove duplicate names', () => {
		const nameList = ['Timothy', 'Molly', 'Timothy']
		const res_duplicate = remove_duplicate(nameList)

		expect(res_duplicate).toBeA('string');
		expect(res_duplicate).toEqual('Name in use');
		
	});

	it('Should not remove any names if no duplicates are present', () => {
		const nameList = ['Timothy', 'Molly', 'Coco']
		const res_duplicate = remove_duplicate(nameList)

		expect(res_duplicate).toBeA('string');
		expect(res_duplicate).toEqual('No duplicates');
		
	});

});