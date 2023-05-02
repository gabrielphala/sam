const { loadLecturerInfo, loadStudentInfo } = require('../middleware');

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(loadLecturerInfo);
    app.use(loadStudentInfo);
};