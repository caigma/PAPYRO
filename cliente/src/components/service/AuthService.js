import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/auth`,
			withCredentials: true
		});
	}

	signup = (role, username, email, password) => {
		return this.service.post('/signup', { role, username, email, password }).then((response) => response.data);
	};

	login = (email, password) => {
		return this.service.post('/login', { email, password }).then((response) => response.data);
	};

	loggedin = () => {
		return this.service.get('/currentuser').then((response) => response.data);
	};

	logout = () => {
		return this.service.get('/logout').then((response) => response.data);
	};

	editprofile = (username) => {
		return this.service.put('/editprofile').then((response) => response.data);
	};

	// const params= this.props.match.params.id   PARA ID DEL USUARIO??
}

export default AuthService;
