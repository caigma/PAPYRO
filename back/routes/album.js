const express = require('express');
require('dotenv');
const Album = require('../models/album.js');
const routeralbum = express.Router();
const uploader = require('../config/cloudinary');
// import { Redirect } from 'react-router-dom';

routeralbum.post('/album/:id', uploader.single('imageUrl'), (req, res, next) => {
	// console.log('file is: ', req.file)

	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	// get secure_url from the file object and save it in the
	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
	res.json({ secure_url: req.file.secure_url });
});

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

// EJEMPLO DANI
// router.post('/api/users/first-user/pictures', uploadCloud.single('photo'), (req, res, next) => {
// 	const imgName = req.file.originalname;
// 	const newPhoto = new Photo({imgName})
// 	console.log(req.file.url);

// 	//actual write in mongo using mongoose
// 	newPhoto.save()
// 	.then(photo => {
// 	  res.json({url: req.file.url, photo: photo});
// 	})
// 	.catch(error => {
// 	  console.log(error);
// 	})
//   });

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

// router.get('/misrutas', (req, res, next) => {
// 	let idUsuario = req.user._id;
// 	Route.find({ creatorId: idUsuario })
// 		.populate('photos')
// 		.then((data) => {
// 			res.render('profile/mis-rutas', { user: req.user, routes: data });
// 		})
// 		.catch(() => {
// 			res.send('An error has ocurred');
// 		});
// });

routeralbum.get('/:_id', (req, res, next) => {
	Album.findById(req.params._id).then((album) => {
		res.json(album);
	});
});

// ESTE GET FUNCIONA.
routeralbum.get('/', (req, res, next) => {
	Album.find().then((album) => {
		res.json(album);
	});
});

routeralbum.post('/photo', (req, res, next) => {
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
});

module.exports = routeralbum;
