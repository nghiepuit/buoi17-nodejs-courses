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

findIndex = (id) => {
    return courses.map((course) => {
        return course.id;
    }).indexOf(id);
}

exports.findAll = (cb) => {
    cb(null, courses);
}

exports.findOne = (id, cb) => {
    let courseIndex = findIndex(id);
    if(courseIndex > -1){
        // tim thay
        cb(null, courses[courseIndex]);
    }else{
        cb('Không tìm thấy khóa học');
    }
}

exports.addCourse = (course, cb) => {
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

exports.update = (course, cb) => {
    let courseIndex = findIndex(course.id);
    if(courseIndex == -1){
        // Khong tim thay
        cb({
            code : 2,
            message : 'Khóa học này không tồn tại',
            description : 'ID không hợp lệ, vui lòng nhập id khác'
        });
    }else{
        // courseIndex != -1
        courses[courseIndex] = course;
        cb(null, course);
    }
};

exports.deleteCourse = (id, cb) => {
    let courseIndex = findIndex(id);
    if(courseIndex == -1){
        // Khong tim thay
        cb({
            code : 2,
            message : 'Khóa học này không tồn tại',
            description : 'ID không hợp lệ, vui lòng nhập id khác'
        });
    }else{
        // Tìm thấy khóa học cần xóa
        let deletedCourse = courses[courseIndex];
        courses.splice(courseIndex, 1); // Khóa học đã bị xóa
        cb(null, deletedCourse);
    }
}