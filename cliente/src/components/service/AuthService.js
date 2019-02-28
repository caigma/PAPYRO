import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/auth',
			withCredentials: true
		});
	}

	// username, email, password
	signup = (user) => {
		return this.service.post('/signup/us', { user }).then((response) => response.data);
	};

	// printerName, email, password
	// esto iba donde printer - { printerName, email, password }
	signupPro = (printer) => {
		return this.service.post('/signup/pr', { printer }).then((response) => response.data);
	};

	login = (email, password, rol) => {
		return this.service.post('/login', { email, password, rol }).then((response) => console.log(response.data));
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
