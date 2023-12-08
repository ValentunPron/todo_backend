import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import worksRoutes from './routes/works.js';
import userRoutes from './routes/user.js';
import cors from 'cors'

dotenv.config();

const app = express();


app.use(cors());


app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/user', userRoutes);
app.use('/api/works', worksRoutes);

mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`DB ok, PORT: ${process.env.PORT}`);
		})
	})
	.catch((error) => {
		console.log(error)
	})