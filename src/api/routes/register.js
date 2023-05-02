const base_controller = require('../controllers/base');
const register_service = require("../../services/Register")

module.exports = (router) => {
    router.post('/register/spot/fetch/latest', base_controller.wrap_with_store(register_service.get_latest_spot));
    router.post('/register/spot/sign', base_controller.wrap_with_store(register_service.sign));
};