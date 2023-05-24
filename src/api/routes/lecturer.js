const base_controller = require('../controllers/base');
const lecturer_service = require("../../services/Lecturer");

const { isLecturerAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/l/sign-in', base_controller.render('lecturer/sign-in', 'Sign in'));
    router.get('/l/attendance-trackers', isLecturerAuth, base_controller.render('lecturer/attendance-trackers', 'Attendane trackers'));
    // router.get('/l/my-modules', base_controller.render('lecturer/modules', 'Modules'));
    // router.get('/l/attendances/report', base_controller.render('lecturer/attendance-report', 'Attendance report'));
    router.get('/l/sign-out', base_controller.sign_out);

    router.post('/lecturer/add', base_controller.wrap(lecturer_service.add));
    router.post('/lecturer/update', base_controller.wrap(lecturer_service.update));
    router.post('/lecturer/delete', base_controller.wrap(lecturer_service.delete));
    router.post('/lecturer/sign-in', base_controller.wrap(lecturer_service.sign_in));
    router.post('/lecturer/fetch/all', base_controller.wrap(lecturer_service.fetch_all));
    router.post('/lecturer/search/all', base_controller.wrap(lecturer_service.searchLecturers));
};