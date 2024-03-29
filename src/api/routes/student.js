const base_controller = require('../controllers/base');
const student_service = require("../../services/Student");

const { isStudentAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/s/trackers', isStudentAuth, base_controller.render('student/trackers', 'Student - Attendance trackers'));
    router.get('/s/attendances', isStudentAuth, base_controller.render('student/attendances', 'Student - Attendance history'));
    router.get('/s/stats', isStudentAuth, base_controller.render('student/stats', 'Student - Attendance stats'));
    router.get('/s/sign-in', base_controller.render('student/sign-in', 'Student - Sign in'));
    router.get('/s/sign-out', base_controller.sign_out);

    router.post('/student/add', base_controller.wrap(student_service.add));
    router.post('/student/update', base_controller.wrap(student_service.update));
    router.post('/student/delete', base_controller.wrap(student_service.delete));
    router.post('/student/sign-in', base_controller.wrap(student_service.sign_in));
    router.post('/student/fetch/all', base_controller.wrap(student_service.fetch_all));
    router.post('/student/search/all', base_controller.wrap(student_service.searchStudents));
};