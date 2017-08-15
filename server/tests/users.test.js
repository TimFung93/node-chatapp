const expect = require('expect');

const {Users} = require('../ultils/users');


describe('Users', () => {
	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: 'Timothy',
			room: 'Room 1'
		}, {
			id: 2,
			name: 'Molly',
			room: 'Room 2'
		}, {
			id: 3,
			name: 'Mo Mo',
			room: 'Room 1'
		}]
	})

	it('Should add new user', () => {
		const newUser = new Users()
		const _user = {
			id: 4,
			name: 'Timothy',
			room: 'Starwars'
		}

		const resUser = newUser.addUser(_user.id, _user.name, _user.room)

		expect(newUser.users).toEqual([_user])
	})


	it('Should return names for Room 1', () => {
		const userList = users.getUserList('Room 1')

		expect(userList).toEqual(['Timothy', 'Mo Mo'])
	})

	it('Should return names for Room 2', () => {
		const userList = users.getUserList('Room 2')

		expect(userList).toEqual(['Molly'])
	})

	it('Should remove a user', () => {
		const userId = 1
		const removeUser = users.removeUser(userId)
		expect(removeUser.id).toBe(userId)
		expect(removeUser).toEqual({
			id: 1,
			name: 'Timothy',
			room: 'Room 1'
		})
		expect(users.users.length).toBe(2)
	})

	it('Should not remove a user', () => {
		const userId = 0
		const removeUser = users.removeUser(userId)
		console.log(removeUser)
		expect(removeUser).toNotExist()
		expect(users.users.length).toBe(3)
	})

	it('Should find one user', () => {
		const userId = 3
		const findUser = users.getUser(userId)
		expect(findUser).toEqual({
			id: 3,
			name: 'Mo Mo',
			room: 'Room 1'	
		})
	})

	it('Should not find one user', () => {
		const userId = 0
		const findUser = users.getUser(userId)
		expect(findUser).toNotExist()
	})
});