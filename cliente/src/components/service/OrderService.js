import axios from 'axios';

export default class OrderService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/'
		});
	}

	newOrder = (code, user, printerId, photosToPrint) => {
		return this.service.post('/order/neworder', { code, user, printerId, photosToPrint }).then((response) => {
			return response.data;
		});
	};
}
