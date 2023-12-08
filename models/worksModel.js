import mongoose from "mongoose";

const WorksShema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		required: true,
		default: false,
	}
}, {timestamps: true})

export default mongoose.model('Works', WorksShema);