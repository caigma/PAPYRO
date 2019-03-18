const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const uploader = require('../config/cloudinary');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//
// login that makes a POST request to the auth/login route passing EMAIL and password????

// upload that makes a POST request to the auth/upload route passing the file PARA MAÑANA
// edit that makes a POST request to the auth/edit route passing username, campus and course,

// logout that makes a GET request to the auth/logout route to destroy user session,

// loggedin that makes a GET request to the auth/loggedin route to check if a user is logged in.
router.get('/loggedin', (req, res, next) => {
	// req.isAuthenticated() is defined by passport
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}
	res.status(403).json({ message: 'Unauthorized' });
});

router.get('/currentuser', (req, res, next) => {
	if (req.user) {
		res.status(200).json(req.user);
	} else {
		next(new Error('Not logged in'));
	}
});

router.put('/profile/update', (req, res, next) => {
	User.findByIdAndUpdate(
		{ _id: req.body.userId },
		{
			username: req.body.username,
			email: req.body.email,
			NIF: req.body.NIF,
			telephone: req.body.telephone,
			street: req.body.street,
			numStreet: req.body.numStreet,
			floor: req.body.floor,
			door: req.body.door,
			postalCode: req.body.postalCode,
			city: req.body.city,
			country: req.body.country
		},
		{ new: true }
	).then((user) => {
		res.json(user);
	});
});

router.post('/update', (req, res, next) => {
	if (req.isAuthenticated()) {
		const imageProfile = req.body.imageProfile;
		User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $set: { imageProfile: imageProfile } },
			{ new: true }
		).then((updateUser) => {
			res.status(200).json(updateUser);
		});
	}
});

router.post('/upload', uploader.single('imageProfile'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ imageProfile: req.file.secure_url });
});

// router.put('/profile/photo', uploadCloud.single('photo'), (req, res, next) => {
// 	console.log('req.file.secure_url', req.file.secure_url);
// 	const imageUrl = req.file.secure_url;
// 	console.log('req.file.secure_url', req.file.secure_url);
// 	User.findByIdAndUpdate({ _id: req.body.ownerId }, { imageProfile: imageUrl }, { new: true }).then((photo) => {
// 		res.json(photo);
// 	});
// });

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			res.status(500).json({ message: 'Something went wrong authenticating user' });
			return;
		}

		if (!theUser) {
			// "failureDetails" contains the error messages
			// from our logic in "LocalStrategy" { message: '...' }.
			res.status(401).json(failureDetails);
			return;
		}

		// save user in session
		req.login(theUser, (err) => {
			if (err) {
				res.status(500).json({ message: 'Session save went bad.' });
				return;
			}

			// We are now logged in (that's why we can also send req.user)
			res.status(200).json(theUser);
		});
	})(req, res, next);
});

// router.get('/signup', (req, res, next) => {
// 	res.render('auth/signup');
// });

router.post('/signup', (req, res, next) => {
	const { role, username, email, password } = req.body;

	if (role === '' || username === '' || email === '' || password === '') {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	User.findOne({ email }, 'email', (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'Email check went bad.' });
			return;
		}

		if (foundUser) {
			res.status(400).json({ message: 'Email taken. Choose another one.' });
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			role: role,
			username: username,
			email: email,
			password: hashPass
		});

		newUser.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving user to database went wrong.' });
				return;
			}

			// Automatically log in user after sign up
			// .login() here is actually predefined passport method
			req.login(newUser, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' });
					return;
				}

				// Send the user's information to the frontend
				// We can use also: res.status(200).json(req.user);
				res.status(200).json(newUser);
			});
		});
	});
});

router.get('/logout', (req, res, next) => {
	// req.logout() is defined by passport
	req.logout();
	res.status(200).json({ message: 'Log out success!' });
});

module.exports = router;
