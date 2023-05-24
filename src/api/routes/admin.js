const base_controller = require('../controllers/base');
const AdminService = require('../../services/Admin');

const { isAdminrAuth } = require('../../middleware');

module.exports = (router) => {
    router.get('/a/sign-in', base_controller.render('admin/sign-in', 'Administration sign in'));
    router.get('/a/modules', isAdminrAuth, base_controller.render('admin/modules', 'Modules'));
    router.get('/a/lecturers', isAdminrAuth, base_controller.render('admin/lecturers', 'Lecturers'));
    router.get('/a/students', isAdminrAuth,base_controller.render('admin/students', 'Students'));
    router.get('/a/attendances', isAdminrAuth, base_controller.render('admin/attendances', 'Attendances'));
    router.get('/a/sign-out', base_controller.sign_out);

    router.post('/a/sign-in', base_controller.wrap(AdminService.sign_in));
};