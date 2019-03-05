const express = require('express');
require('dotenv');
const User = require('../models/User.js');
const routerprinter = express.Router();
// const uploadPhoto = require('../config/cloudinary');

routerprinter.get('/', (req, res, next) => {
	User.find().then((users) => {
		res.json(users);
	});
});

module.exports = routerprinter;
