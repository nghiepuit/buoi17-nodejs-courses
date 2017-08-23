var express = require('express');
var router = express.Router();
var courseController = require('../controllers/course');

// Get All
router.route('/courses').get(courseController.findAll);

// Get One
router.route('/course/:id').get(courseController.findOne);

//Add Course
router.route('/course').post(courseController.addCourse);

//Update Course
router.route('/course/:idCourse').put(courseController.updateCourse);

//Delete Course
router.route('/course/:id').delete(courseController.deleteCourse);

module.exports = router;