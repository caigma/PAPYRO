import axios from 'axios';

const service = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true
});

const errHandler = (err) => {
	// console.error(err);
	if (err.response && err.response.data) {
		// console.error("API response", err.response.data);
		throw err.response.data.message;
	}
	throw err;
};

export default {
	// You can have as many methods as you want

	// Method addPicture
	addPicture(file, albumid, ownerid) {
		const formData = new FormData();
		formData.append('photo', file);
		return service
			.post('/album/photo/' + albumid + '/' + ownerid, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((res) => res.data)
			.catch(errHandler);
	}
};
