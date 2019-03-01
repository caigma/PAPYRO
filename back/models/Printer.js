const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printerSchema = new Schema(
	{
		name: String,
		email: String,
		passport: String,
		NIF: String,
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		share: { type: Boolean, default: false },
		toPrint: { type: Boolean, default: false },
		printed: { type: Boolean, default: false },
		orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
		rol: String
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Printer = mongoose.model('Printer', printerSchema);
module.exports = Printer;
