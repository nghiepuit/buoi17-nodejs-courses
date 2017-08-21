var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var courses = [{
        id: 1,
        name: 'Angular 4',
        description: 'Front end',
        fee: 10
    },
    {
        id: 2,
        name: 'React',
        description: 'Front end',
        fee: 5
    }
];

function findAll(cb) {
    cb(null, courses);
}

function findIndex(id) {
    return courses.map((course) => {
        return course.id;
    }).indexOf(id);
}

function findOne(id, cb){
	let courseIndex = findIndex(id);
	if(courseIndex > -1){
		// tim thay
		cb(null, courses[courseIndex]);
	}else{
		cb('Không tìm thấy khóa học');
	}
}

function addCourse(course, cb){
	let courseIndex = findIndex(course.id);
	if(courseIndex > -1){
		// trùng id
		cb({
			code : 1,
			message : 'Khóa học này đã tồn tại',
			description : 'ID không hợp lệ, vui lòng nhập id khác'
		});
	}else{
		courses.push(course);
		cb(null, course);
	}
}

app.get('/api/courses', (req, res) => {
    findAll((err, data) => {
        if (err) return res.json(err);
        res.status(200).json(data);
    });
});

app.get('/api/course/:id', (req, res) => {
	let id = parseInt(req.params.id);
	findOne(id, (err, course) => {
		if(err) return res.json(err);
		res.status(200).json(course);
	});
});

// Add Course
app.post('/api/course', (req, res) => {
	let course = {
		id : parseInt(req.body.txtID),
		name : req.body.txtName,
		description : req.body.txtDescription,
		fee : req.body.txtFee
	};
	addCourse(course, (err, course) => {
		if(err) return res.json(err);
		res.status(200).json(course);
	});
});

// Update Course
app.put('/api/course', (req, res) => {
	let name = req.body.txtName;
	let fee = req.body.fee;
	res.send({
		name : name,
		fee : fee
	});
});

// Delete Course
app.delete('/api/course', (req, res) => {
	let name = req.body.txtName;
	let fee = req.body.fee;
	res.send({
		name : name,
		fee : fee
	});
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});