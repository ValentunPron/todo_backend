import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const createToken = (_id) => {
	return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d'})
}

export const registerUser = async (req, res) => {
	const {fullName, email, password} = req.body;

	try {
		const user = await userModel.register(fullName, email, password);

		const token = createToken(user._id);

		res.status(201).json({fullName, email, token})
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error.message})
	}
}

export const loginUser = async (req, res) => {
	const {email, password} = req.body;

	try {
		const user = await userModel.login(email, password);

		const token = createToken(user._id);

		res.status(201).json({email, token});
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error.message});
	}
}