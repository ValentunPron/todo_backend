import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserShema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		uniuqe: true, // Унікальність почти 
	},
	password: {
		type: String,
		required: true,
	}
});

UserShema.statics.register = async function(fullName, email, password) {

	if (!fullName || !email || !password) {
		throw Error('Всі поля мають бути заповнені');
	}
	
	if(!validator.isEmail(email)) {
		throw Error('Неправильна електронна почта');
	}

	if(fullName.length < 4) {
		throw Error("Ім'я має містити як мінімум 4 символа")
	}

	if(password.length < 8) {
		throw Error('Пароль занадто простий')
	}

	const exists = await this.findOne({ email });

	if(exists) {
		throw Error('Електронна почта уже використовується');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({fullName, email, password: hash});

	return user;
}

UserShema.statics.login = async function(email, password) {

	if(!email || !password) {
		throw Error('Всі поля мають бути заповнені');
	}

	const user = await this.findOne({email});

	if(!user) {
		throw Error('Дана електрона почта не зареєстрована');
	}

	const match = await bcrypt.compare(password, user.password);

	if(!match) {
		throw Error('Неправильна почта або пароль');
	}

	return user
}

export default mongoose.model('User', UserShema);