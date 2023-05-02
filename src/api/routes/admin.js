const base_controller = require('../controllers/base');

module.exports = (router) => {
    router.get('/a/sign-in', base_controller.render('admin/sign-in', 'Administration sign in'));
    router.get('/a/modules', base_controller.render('admin/modules', 'Modules'));
    router.get('/a/lecturers', base_controller.render('admin/lecturers', 'Lecturers'));
    router.get('/a/students', base_controller.render('admin/students', 'Students'));
    router.get('/a/attendances', base_controller.render('admin/attendances', 'Attendances'));
    router.get('/a/sign-out', base_controller.sign_out);
};