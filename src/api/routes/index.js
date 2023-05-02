const admin_routes = require('./admin');
const module_routes = require('./module');
const student_routes = require('./student');
const lecturer_routes = require('./lecturer');
const attendance_tracker_routes = require('./attendance-tracker');
const register = require('./register');

module.exports = (router) => {
    admin_routes(router);
    module_routes(router);
    student_routes(router);
    lecturer_routes(router);
    attendance_tracker_routes(router);
    register(router);
};