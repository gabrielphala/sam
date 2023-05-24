const jwt = require('../helpers/Jwt');

module.exports.isStudentAuth = (req, res, next) => {
    if (!req.store || req.store && !req.store.student_info)
        return res.redirect('/s/sign-in');

    next();
}

module.exports.isLecturerAuth = (req, res, next) => {
    if (!req.store || req.store && !req.store.lecturer_info)
        return res.redirect('/l/sign-in');

    next();
}

module.exports.isAdminrAuth = (req, res, next) => {
    if (!req.store || req.store && !req.store.admin_info)
        return res.redirect('/a/sign-in');

    next();
}

module.exports.loadLecturerInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tf_lecturer'])
        return next();

    jwt.verify(req.cookies['tf_lecturer'].jwtAccess, (lecturer_info) => {
        if (!req.store) req.store = {}
        req.store.lecturer_info = lecturer_info;
        res.locals.lecturer_info = lecturer_info;
    });

    next();
}

module.exports.loadAdminInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tf_admin'])
        return next();

    jwt.verify(req.cookies['tf_admin'].jwtAccess, (admin_info) => {
        if (!req.store) req.store = {}
        req.store.admin_info = admin_info;
        res.locals.admin_info = admin_info;
    });

    next();
}

module.exports.loadStudentInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tf_student'])
        return next();

    jwt.verify(req.cookies['tf_student'].jwtAccess, (student_info) => {
        if (!req.store) req.store = {}
        req.store.student_info = student_info;
        res.locals.student_info = student_info;
    });

    next();
}