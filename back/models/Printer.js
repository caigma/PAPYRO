const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printerSchema = new Schema(
	{
		printerName: String,
		email: String,
		passport: String,
		NIF: String,
		share: Boolean,
		toPrint: Boolean,
		printed: Boolean,
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
