const apiLocalStorage = {
	get(key: string){
		return localStorage.getItem(key) || 'list';
	},
	
	save(key: string, value: string){
		return localStorage.setItem(key, value);
	}
}

export default apiLocalStorage;