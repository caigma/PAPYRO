const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printerSchema = new Schema(
	{
		email: String,
		passport: String,
		printerName: String,
		NIF: String,
		share: Boolean,
		toPrint: [ number ],
		printed: [ number ],
		orderId: { type: Schema.Types.ObjectId, ref: 'Order' }
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
