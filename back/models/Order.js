const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		code: Number,
		userId: String,
		printerId: String,
		contactUser: String,
		contactPrinter: Boolean,
		startDate: { type: Date, default: Date.now },
		finishOrder: { type: Date, default: Date.now },
		pending: Boolean,
		finished: Boolean
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
