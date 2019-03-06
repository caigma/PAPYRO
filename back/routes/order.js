const express = require('express');
require('dotenv');
const Order = require('../models/Order.js');
const routerorder = express.Router();
// const uploadPhoto = require('../config/cloudinary');

routerorder.get('/', (req, res, next) => {
	Order.find().then((users) => {
		res.json(users);
	});
});

routerorder.post('/neworder', (req, res, next) => {
	Order.create({
		code: req.body.code,
		contactUser: req.body.username,
		printerId: req.body.printerId,
		photosToPrint: req.body.photosToPrint
	})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = routerorder;
