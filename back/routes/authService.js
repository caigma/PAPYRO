const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Printer = require('../models/Printer');

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

function whatIsYouRol(email) {
	return User.find({
		email
	})
		.then(
			(user) =>
				user.length == 0
					? Printer.find({
							email
						})
					: 'user'
		)
		.then((rol) => (rol === 'user' ? 'user' : 'printer'))
		.catch((err) => err);
}

router.post('/login', (req, res, next) => {
	whatIsYouRol(req.body.email)
		.then((rol) => {
			console.log(rol);
			passport.authenticate(rol, (err, theUser, failureDetails) => {
				if (err) {
					res.status(500).json({ message: 'Something went wrong authenticating user' });
					return;
				}

				if (!theUser) {
					console.log();
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
					return res.status(200).json(theUser);
				});
			})(req, res, next);
		})
		.catch((err) => err);
});

// router.get('/signup', (req, res, next) => {
// 	res.render('auth/signup');
// });

router.post('/signup/us', (req, res, next) => {
	console.log(req.body);
	const { username, email, password } = req.body.user;

	if (username === '' || email === '' || password === '') {
		res.status(400).json({ message: 'Provide username, email and password' });
		return;
	}

	User.findOne({ email }, 'email', (err, foundUser) => {
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

router.post('/signup/pr', (req, res, next) => {
	console.log(req.body);
	const { printerName, email, password } = req.body.printer;

	if (printerName === '' || email === '' || password === '') {
		res.status(400).json({ message: 'Provide username, email and password' });
		return;
	}

	Printer.findOne({ email }, 'email', (err, foundUser) => {
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

		const newPrinter = new Printer({
			printerName: printerName,
			email: email,
			password: hashPass
		});

		newPrinter.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving printer to database went wrong.' });
				return;
			}

			// Automatically log in user after sign up
			// .login() here is actually predefined passport method
			req.login(newPrinter, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' });
					return;
				}

				// Send the user's information to the frontend
				// We can use also: res.status(200).json(req.user);
				res.status(200).json(newPrinter);
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
