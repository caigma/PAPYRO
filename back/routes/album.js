const express = require('express');
require('dotenv');
const Album = require('../models/album.js');
const routeralbum = express.Router();

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
	Album.findById(req.params.userId).then((album) => {
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
