import axios from 'axios';

export default class OrderService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/'
		});
	}

	generateOrder = () => {
		return this.service.get('/neworder').then((response) => {
			console.log(response);
			return response.data;
		});
	};
}
