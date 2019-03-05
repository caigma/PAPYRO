const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: String,
		email: String,
		password: String,
		NIF: String,
		companyname: String,
		telephone: String,
		contactPerson: String,
		coordinates: {},
		street: String,
		numStreet: String,
		floor: String,
		door: String,
		postalCode: String,
		city: String,
		country: String,
		imageProfile: {
			type: String,
			default: 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
		},
		role: String
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const User = mongoose.model('User', userSchema);
module.exports = User;
