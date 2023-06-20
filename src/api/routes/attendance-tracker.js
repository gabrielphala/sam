const base_controller = require('../controllers/base');
const tracker_service = require("../../services/AttendanceTracker")

module.exports = (router) => {
    router.post('/attendance-tracker/add', base_controller.wrap_with_store(tracker_service.add));
    router.post('/attendance-tracker/edit', base_controller.wrap(tracker_service.edit));
    router.post('/attendance-tracker/delete', base_controller.wrap_with_store(tracker_service.delete));
    router.post('/attendance-tracker/fetch/lecturer', base_controller.wrap_with_store(tracker_service.get_by_lecturer));
    router.post('/attendance-tracker/fetch/old/lecturer', base_controller.wrap_with_store(tracker_service.get_old_by_lecturer));
    router.post('/attendance-tracker/fetch/student', base_controller.wrap_with_store(tracker_service.get_by_student_modules));
    router.post('/attendance-tracker/fetch/admin', base_controller.wrap(tracker_service.get_for_admin));
};