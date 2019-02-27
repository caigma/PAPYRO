const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema(
	{
		imageURL: String,
		thumbnail: String,
		imageName: String,
		authorId: { type: Schema.Types.ObjectId, ref: 'User' },
		share: Boolean,
		toPrint: Boolean,
		printed: Boolean
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
