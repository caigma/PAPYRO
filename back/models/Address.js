const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema(
	{
		coordinates: {},
		street: String,
		numStreet: String,
		floor: String,
		door: String,
		postalCode: String,
		city: String,
		country: String
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Address = mongoose.model('Order', addressSchema);
module.exports = Address;
