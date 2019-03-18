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

	editprofile = (
		username,
		email,
		NIF,
		telephone,
		street,
		numStreet,
		floor,
		door,
		postalCode,
		city,
		country,
		userId
	) => {
		return this.service
			.put('/profile/update', {
				username,
				email,
				NIF,
				telephone,
				street,
				numStreet,
				floor,
				door,
				postalCode,
				city,
				country,
				userId
			})
			.then((response) => {
				return response.data;
			});
	};

	handleUpload = (theFile) => {
		return this.service.post('/upload', theFile).then((res) => res.data);
	};

	updatePhotoProfile = (photo) => {
		return this.loggedin().then((user) => {
			console.log('user', user);
			console.log('photo', photo.imageProfile);
			user.imageProfile = photo.imageProfile;
			console.log('updatePhotoProfile in AuthService user.imageProfile', user.imageProfile);
			return this.service.post('/update', user).then((res) => res.data);
		});
	};

	// addPhotoProfile = (file, ownerId) => {
	// 	const errHandler = (err) => {
	// 		// console.error(err);
	// 		if (err.response && err.response.data) {
	// 			// console.error("API response", err.response.data);
	// 			throw err.response.data.message;
	// 		}
	// 		throw err;
	// 	};

	// 	const formData = new FormData();
	// 	formData.append('photo', file);
	// 	return this.service
	// 		.put('/profile/photo', {
	// 			ownerId,
	// 			formData,
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data'
	// 			}
	// 		})
	// 		.then((response) => {
	// 			return response.data;
	// 		})
	// 		.catch(errHandler);
	// };

	// const params= this.props.match.params.id   PARA ID DEL USUARIO??
}

export default AuthService;
