const passport = require('passport');
const User = require('../models/User');
const Printer = require('../models/Printer');

passport.serializeUser((loggedInUser, cb) => {
	cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
	User.findById(userIdFromSession)
		.then((userDocument) => {
			cb(null, userDocument);
		})
		.catch((err) => {
			cb(err);
		});
});

passport.deserializeUser((userIdFromSession, cb) => {
	Printer.findById(userIdFromSession)
		.then((userDocument) => {
			cb(null, userDocument);
		})
		.catch((err) => {
			cb(err);
		});
});
