import axios from 'axios';

export default class PrinterService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/`
		});
	}

	getUsersAndPrinters = () => {
		return this.service.get('/printer').then((response) => {
			return response.data;
		});
	};
}
