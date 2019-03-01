const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema(
	{
		title: String,
		description: String,
		photos: [ { type: Schema.Types.ObjectId, ref: 'Photo' } ],
		owner: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
