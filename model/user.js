import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		min: 10,
	},
	password: {
		type: String,
		required: true,
		min: 6
	}
}, {
	collection: 'Users'
}
)

export default mongoose.model('user', userSchema);