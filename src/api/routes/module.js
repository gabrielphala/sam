const base_controller = require('../controllers/base');
const module_service = require("../../services/Module")

module.exports = (router) => {
    router.post('/module/add', base_controller.wrap(module_service.add));
    router.post('/module/delete', base_controller.wrap(module_service.delete));
    router.post('/module/update', base_controller.wrap(module_service.update));
    router.post('/module/fetch/all', base_controller.wrap(module_service.fetch_all));
    router.post('/module/fetch/lecturer', base_controller.wrap_with_store(module_service.fetch_by_lecturer));
};