const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema(
	{
		street: String,
		numStreet: Number,
		floor: Number,
		door: String,
		postalCode: Number,
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
