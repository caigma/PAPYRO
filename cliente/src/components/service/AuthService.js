import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.API_URL}/auth`,
			withCredentials: true
		});
	}

	signup = (username, email, password) => {
		return this.service.post('/signup/us', { username, email, password }).then((response) => response.data);
	};

	signupPro = (printerName, email, password) => {
		return this.service.post('/signup/pr', { printerName, email, password }).then((response) => response.data);
	};

	login = (email, password) => {
		return this.service.post('/login', { email, password }).then((response) => response.data);
	};

	loggedin = () => {
		return this.service.get('/currentUser').then((response) => response.data);
	};

	logout = () => {
		return this.service.get('/logout').then((response) => response.data);
	};

	editprofile = (username, email, password, imageProfile) => {
		return this.service
			.put('/editprofile', { username, email, password, imageProfile })
			.then((response) => response.data);
	};
}

export default AuthService;
