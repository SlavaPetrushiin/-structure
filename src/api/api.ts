const api = {
	getUsers(){
		return fetch('https://randomuser.me/api/?results=10')
			.then(response => response.json())
			.catch(error => error)
	}
}

export default api;