const express = require('express');
require('dotenv');
// const Photo = require('../models/photo.js');
// const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
//INVESTIGAR: UPLOADCLOUD.SINGLE('PHOTO') - MULTIPLE

// ESTE IBA BIEN
// router.post('/api/photo', uploadCloud.single('photo'), (req, res, next) => {
// 	const imgName = req.file.originalname;
// 	const newPhoto = new Photo({ imgName });
// 	console.log(req.file.url);

// 	//actual write in mongo using mongoose
// 	newPhoto
// 		.save()
// 		.then((photo) => {
// 			console.log('BACK EN INDEX.JS VIENDO REQ.FILE.URL', req.file.url);
// 			res.json({ url: req.file.url, photo: photo });
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

// routeralbum.post('/album/:id', uploadPhoto.single('imageUrl'), (req, res, next) => {
// 	const newPhoto = new Photo({
// 		imageUrl: req.file.originalname,
// 		authorId: req.user._id
// 	});

// 	newPhoto
// 		.save()
// 		//ME DEVUELVE EL ID DEL COMENTARIO QUE SE ACABA DE GENERAR Y GUARDAR
// 		.then((photo) => {
// 			Album.findByIdAndUpdate(req.params.id, {
// 				//LENGUAJE MONGO...INSERTAMOS EL ID DEL COMENTARIO EN EL ARRAY DEL POST Y ACTUALIZANDO EL POST CON ESA INFO
// 				$push: { photos: photo._id }
// 			})
// 				.then(() => res.redirect('/albums-list'))
// 				.catch((err) => console.log('An error ocurred refering a photo in Album', err));
// 		})
// 		.catch((err) => console.log('An error ocurred saving a photo in db', err));
// });

module.exports = router;
