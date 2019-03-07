import axios from 'axios';

export default class OrderService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/`
		});
	}

	newOrder = (code, user, printerId, photosToPrint) => {
		return this.service.post('/order/neworder', { code, user, printerId, photosToPrint }).then((response) => {
			return response.data;
		});
	};
}
