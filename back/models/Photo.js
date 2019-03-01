const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema(
	{
		imageUrl: String,
		thumbnailUrl: String,
		name: String,
		description: String,
		hastags: [ String ],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		album: { type: Schema.Types.ObjectId, ref: 'Album' },
		share: { type: Boolean, default: false },
		public: { type: Boolean, default: false },
		toPrint: { type: Boolean, default: false },
		printed: { type: Boolean, default: false }
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
