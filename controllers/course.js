var courseModel = require('../models/course');

exports.findAll = (req, res) => {
	courseModel.findAll((err, data) => {
        if (err) return res.json(err);
        res.status(200).json(data);
    });
}

exports.findOne = (req, res) => {
	let id = parseInt(req.params.id);
	courseModel.findOne(id, (err, course) => {
		if(err) return res.json(err);
		res.status(200).json(course);
	});
}

exports.addCourse = (req, res) => {
	let course = {
		id : parseInt(req.body.txtID),
		name : req.body.txtName,
		description : req.body.txtDescription,
		fee : req.body.txtFee
	};
	courseModel.addCourse(course, (err, course) => {
		if(err) return res.json(err);
		res.status(200).json(course);
	});
}

exports.updateCourse = (req, res) => {
	let id = parseInt(req.params.idCourse);
	courseModel.findOne(id, (err, data) => {
		if(err) return res.status(404).json(err);
		else{
			let course = {
				id : id,
				name : req.body.txtName || data.name,
				description : req.body.txtDescription || data.description,
				fee : req.body.txtFee || data.fee
			};
			courseModel.update(course, (err, course) => {
				if(err) return res.status(404).json(err);
				res.status(202).json(course);
			});
		}
	});
}

exports.deleteCourse = (req, res) => {
	let id = parseInt(req.params.id);
	courseModel.deleteCourse(id, (err, course) => {
		if(err) return res.status(404).json(err);
		res.status(202).json(course); 
	});
}