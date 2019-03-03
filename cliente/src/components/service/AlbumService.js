import axios from 'axios';

export default class AlbumService {
	constructor() {
		this.service = axios.create({
			baseURL: 'http://localhost:5000/'
		});
	}

	addAlbum = (title, description) => {
		return this.service
			.post('/album', { title, description }, { withCredentials: true })
			.then((response) => response.data);
	};

	getAlbums = () => {
		return this.service.get('/album', { withCredentials: true }).then((response) => response.data);
	};

	modifyALbum = (title, description, photos, owner) => {
		return this.service
			.put('/album/${this.props.album._id}', { title, description, photos, owner }, { withCredentials: true })
			.then((response) => response.data);
	};

	getSingleAlbum = () => {
		return this.service.get('/album/${params.id}', { withCredentials: true }).then((response) => response.data);
	};
}
