var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var courseRouter = require('./routers/course');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', courseRouter);

app.get('*', (req, res) => {
	res.status(404).json({
		code : 3,
		message : 'Đường dẫn không tồn tại!',
		description : 'Router không có trong hệ thống'
	});
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});