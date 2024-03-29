const base_controller = require('../controllers/base');
const register_service = require("../../services/Register")

module.exports = (router) => {
    router.post('/register/spot/fetch/latest', base_controller.wrap_with_store(register_service.get_latest_spot));
    router.post('/register/spot/sign', base_controller.wrap_with_store(register_service.sign));
    router.post('/register/get-students-by-tracker', base_controller.wrap(register_service.get_students_by_tracker));
    router.post('/register/get-attendances', base_controller.wrap_with_store(register_service.get_attendances));
    router.post('/register/get-stats', base_controller.wrap_with_store(register_service.get_stats));
    router.post('/register/get-module-stats', base_controller.wrap(register_service.get_students_stats_module));
};