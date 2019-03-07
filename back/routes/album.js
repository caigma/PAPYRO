const express = require('express');
require('dotenv');
const Album = require('../models/Album.js');
const routeralbum = express.Router();
const uploadCloud = require('../config/cloudinary');
const Photo = require('../models/photo.js');
// import { Redirect } from 'react-router-dom';

// TRAEMOS LOS DATOS DE LA PHOTO PARA GUARDARLO EN BASE DE DATOS
routeralbum.post('/photo/:albumid/:ownerid', uploadCloud.single('photo'), (req, res, next) => {
	const imgName = req.file.originalname;
	const imageUrl = req.file.secure_url;
	const album = req.params.albumid;
	const owner = req.params.ownerid;
	const newPhoto = new Photo({ imgName, imageUrl, album, owner });

	// GUARDAMOS PHOTO E INSERTAMOS EN EL ALBUM EL ID DE LA PHOTO
	newPhoto
		.save()
		.then((photo) => {
			Album.findByIdAndUpdate(req.params.albumid, {
				$push: { photos: photo._id }
			})
				.then(() => res.redirect(`/albums-list/${album._id}`))
				.catch((err) => console.log('An error ocurred refering a photo in Album', err));
		})
		.catch((error) => {
			console.log(error);
		});
});
// CONSIGO TODOS LOS USUARIOS DE MI BASE DE DATOS
routeralbum.post('/List', (req, res, next) => {
	Album.find({ owner: req.body.user }).then((album) => {
		res.json(album);
	});
});
// CONSIGO TODOS LAS FOTOS DEL ALBUM SELECCIONADO
routeralbum.post('/listphotos', (req, res, next) => {
	Photo.find({ album: req.body.albumid }).then((photos) => {
		res.json(photos);
	});
});

// CONSIGO TODOS LAS FOTOS DEL USUARIO (para ponerlas en su home)
routeralbum.post('/allphotosUser', (req, res, next) => {
	Photo.find({ owner: req.body.ownerid }).then((photos) => {
		res.json(photos);
	});
});

// QUIERO CONSEGUIR LA FOTO SELECCIONADA
routeralbum.post('/singlephoto', (req, res, next) => {
	Photo.findById(req.body.photoid).then((photo) => {
		res.json(photo);
	});
});
// PUT UPDATE
routeralbum.put('/singlephoto-update', (req, res, next) => {
	Photo.findByIdAndUpdate(
		{ _id: req.body.photoid },
		{ public: req.body.newpublic, toPrint: req.body.newtoPrint, content: req.body.newcontent },
		{ new: true }
	).then((photo) => {
		res.json(photo);
	});
});

routeralbum.post('/', (req, res, next) => {
	Album.create({
		title: req.body.title,
		description: req.body.description,
		photos: [],
		owner: req.user._id
	})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

routeralbum.get('/:_id', (req, res, next) => {
	Album.findById(req.params._id).then((album) => {
		res.json(album);
	});
});

// routeralbum.post('/photo', (req, res, next) => {
// Photo.create({
// 	title: req.body.title,
// 	description: req.body.description,
// 	photos: [],
// 	owner: req.user._id
// })
// 	.then((response) => {
// 		res.json(response);
// 	})
// 	.catch((err) => {
// 		res.json(err);
// 	});
// });

// 	newPhoto
// 		.save()
// 		//ME DEVUELVE EL ID DEL COMENTARIO QUE SE ACABA DE GENERAR Y GUARDAR
// 		.then((photo) => {
// 			Album.findByIdAndUpdate(req.params.id, {
// 				//LENGUAJE MONGO...INSERTAMOS EL ID DEL COMENTARIO EN EL ARRAY DEL POST Y ACTUALIZANDO EL POST CON ESA INFO
// 				$push: { photos: photo._id }
// 			})
// 				.then(() => res.redirect('/album/:id'))
// 				.catch((err) => console.log('An error ocurred refering a photo in Album', err));
// 		})
// 		.catch((err) => console.log('An error ocurred saving a photo in db', err));
// });

module.exports = routeralbum;
