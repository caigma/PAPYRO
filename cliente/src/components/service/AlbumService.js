import axios from 'axios';

export default class AlbumService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}`
		});
	}

	addAlbum = (title, description) => {
		return this.service
			.post('/album', { title, description }, { withCredentials: true })
			.then((response) => response.data);
	};

	// CONSIGO LOS ALBUMES DE UN USUARIO
	getAlbums = (user) => {
		return this.service.post(`/album/List`, { user }).then((response) => response.data);
	};

	modifyALbum = (title, description, photos, owner) => {
		return this.service
			.put(`/album/${this.props.album._id}`, { title, description, photos, owner }, { withCredentials: true })
			.then((response) => response.data);
	};

	// CONSIGO TODAS LAS FOTOS DE UN ALBUM
	getPhotosAlbumId = (albumid) => {
		return this.service.post('/album/listphotos', { albumid }).then((response) => response.data);
	};

	// CONSIGO TODAS LAS FOTOS DE UN USUARIO
	getAllPhotosUser = (ownerid) => {
		return this.service.post('/album/allphotosUser', { ownerid }).then((response) => response.data);
	};

	// CONSIGO UNA FOTO POR SU ID
	getPhotoId = (photoid) => {
		return this.service.post('/album/singlephoto', { photoid }).then((response) => {
			return response.data;
		});
	};

	udatePhoto = (newpublic, newtoPrint, newcontent, photoid) => {
		return this.service
			.put('/album/singlephoto-update', { newpublic, newtoPrint, newcontent, photoid })
			.then((response) => {
				return response.data;
			});
	};

	// getPhotoId = (photoid) => {
	// 	console.log('HOOOLA, ESTOY EN albumservice axios', photoid);
	// 	return this.service.get(`/album/singlephoto/${photoid}`).then((response) => response.data);
	// };

	// getSingleAlbum = () => {
	// 	return this.service.get(`/album/${params.id}`, { withCredentials: true }).then((response) => response.data);
	// };

	// getAllUsers = () => {
	// 	return this.service.get('/printers').then((response) => response.data);
	// };
}
