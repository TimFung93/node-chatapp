class Users {
	constructor() {
		this.users = []
	}
	addUser(id, name, room) {
		const user = {
			id,
			name,
			room
		}


		this.users.push(user)	
		return user
	
	}

	removeUser(id) {

		const removedUser = this.getUser(id)
		if (removedUser) {
			this.users = this.users.filter(user => {
				return user.id !== id
			})
		}

		return removedUser
	}

	getUser(id) {
		const user = this.users.filter(user => {
			return user.id === id
		})

		return user[0]
	}

	getUserList(room) {
		const users = this.users.filter(user => {
			return user.room === room
		})

		const userList = users.map(user => {
			return user.name
		})

		return userList
	}

};




module.exports = {
	Users
};
