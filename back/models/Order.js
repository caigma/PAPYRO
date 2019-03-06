const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		code: Number,
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		printerId: { type: Schema.Types.ObjectId, ref: 'User' },
		contactUser: String,
		contactPrinter: Boolean,
		photosToPrint: [ {} ],
		startDate: { type: Date, default: Date.now },
		finishOrder: Date,
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
