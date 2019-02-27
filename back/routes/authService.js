const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

///BACK BACK BACK BACKBACK BACKBACK BACKBACK BACKBACK BACKBACK BACKBACK BACKBACK BACKBACK BACK

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
	const { username, email, password } = req.body;

	if (username === '' || email === '' || password === '') {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	User.findOne({ username }, 'username', (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'Username check went bad.' });
			return;
		}

		if (foundUser) {
			res.status(400).json({ message: 'Username taken. Choose another one.' });
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			username: username,
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

router.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = router;
