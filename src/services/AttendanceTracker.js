const AttendanceTracker = require('../models/AttendanceTracker')
const StudentModule = require('../models/StudentModule')
const Module = require('../models/Module')

const moment = require("moment-timezone");

module.exports = class AttendanceService {
    static async add (wrap_res, body, store) {
        try {
            if (body.module_id == 'select') throw 'Please select a module';

            AttendanceTracker.insert({
                lecturer_id: store.lecturer_info.id,
                module_id: body.module_id,
                pc_count: body.pc_count,
                start_period: moment(`${body.start_period}Z`).toDate(),
                end_period: moment(`${body.end_period}Z`).toDate(),
            })

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async delete (wrap_res, body, store) {
        try {
            AttendanceTracker.deleteTracker(body.tracker_id)

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_by_lecturer (wrap_res, _, { lecturer_info }) {
        try {
            wrap_res.attendanceTrackers = await AttendanceTracker.getByLecturer(lecturer_info.id);

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_for_admin (wrap_res, _) {
        try {
            wrap_res.attendanceTrackers = await AttendanceTracker.getForAdmin();

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_by_student_modules (wrap_res, _, { student_info }) {
        try {
            const student_modules = await StudentModule.getBystudent(student_info.id),
                conditions = [];

            student_modules.forEach((student_module) => {
                return conditions.push({ module_id: student_module.module_id, status: 'open' })
            })

            wrap_res.attendanceTrackers = await AttendanceTracker.getByStudentModules(conditions);

            for (let i = 0; i < wrap_res.attendanceTrackers.length; i++) {
                wrap_res.attendanceTrackers[i].name = (await Module.fetch_by_id(wrap_res.attendanceTrackers[i].module_id)).name;
            }

            return wrap_res;
        } catch (e) { throw e; }
    }
}