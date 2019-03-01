import axios from 'axios';

export default class AlbumService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/'
		});
	}

	addAlbum = (title, description, photos, owner) => {
		return this.service.post('/signup', { title, description, photos, owner }).then((response) => response.data);
	};
}
