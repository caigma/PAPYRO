import axios from 'axios';

export default class PrinterService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/'
		});
	}

	getUsersAndPrinters = () => {
		return this.service.get('/printer').then((response) => {
			return response.data;
		});
	};
}
