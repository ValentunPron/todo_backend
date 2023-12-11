import mongoose from "mongoose";
import worksModel from "../models/worksModel.js";

export const postWork = async (req, res) => {
	const {title} = req.body;

	if (!title) {
		return res.status(404).json({error: 'Введіть задачу на сьогодні!'});
	}

	try {
		const works = await worksModel.create({title});
		res.status(200).json(works);
	} catch (error) {
		console.log(error);
		res.status(404).json({error: error});
	}
}

export const getWorks = async (req, res) => {
	try {
		const works = await worksModel.find();
		
		works.forEach((work, element) => {
			console.log(element, work.title);
		});
		res.status(200).json(works);
	} catch (error) {
		console.log(error);
		res.status(404).json({error: error})
	}
} 

export const updateWork = async (req, res) => {
	const workID = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(workID)) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	const workoutOne = await worksModel.findByIdAndUpdate({_id: workID}, {
		title: req.body.title,
	});

	if (!workoutOne) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	try {
		res.status(200).json({messge: "Задачу оновлено!"})
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error.message})
	}
}

export const removeWork = async (req, res) => {
	const workID = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(workID)) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	const workOne = await worksModel.findByIdAndDelete({_id: workID});

	if(!workOne) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	try {
		res.status(200).json({messge: "Задачу видалено!"})
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error.message})
	}
}

export const setStatus = async (req, res) => {
	const workID = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(workID)) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	if (typeof req.body.status !== 'boolean') {
		return res.status(404).json({error: 'статус неправильно задано!'});
	}

	const workOne = await worksModel.findByIdAndUpdate({_id: workID}, {
		status: req.body.status,
	});

	if(!workOne) {
		return res.status(404).json({error: 'Задачу не найдено!'});
	}

	try {
		res.status(200).json({messge: "Статус оновлено!"})
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error.message})
	}
}