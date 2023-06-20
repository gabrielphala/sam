const AttendanceTracker = require('../models/AttendanceTracker')
const Register = require('../models/Register')

const String = require("../helpers/String");
const StudentModule = require('../models/StudentModule');

module.exports = class RegisterService {
    static async get_latest_spot (wrap_res, body, store) {
        try {
            let latest_spot = await Register.getOpenSpotByAttendanceId(body.attendance_tracker_id)
            
            if (!latest_spot) {
                let tracker = await AttendanceTracker.getById(body.attendance_tracker_id)

                latest_spot = await Register.insert({
                    attendance_tracker_id: body.attendance_tracker_id,
                    module_id: tracker.module_id,
                    unique_no: String.uniqueId(10)
                })
            }
            
            wrap_res.register_unique_no = latest_spot.unique_no;

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async sign (wrap_res, body, { student_info }) {
        try {
            if ((await Register.exists({ student_id: student_info.id, attendance_tracker_id: body.attendance_tracker_id })).found)
                throw 'You have already signed in to this class';

            let tracker = await AttendanceTracker.getById(body.attendance_tracker_id)
            
            tracker.attendance_count += 1;

            tracker.save();

            const spot = await Register.findOne({
                condition: {
                    unique_no: body.registration_spot_id, status: 'open'
                }
            })

            const usedPCCount = (await Register.countUsedPCs(body.attendance_tracker_id))

            if (!spot)
                throw 'QR Code has expired or has been used';

            if (tracker.pc_count < usedPCCount)
                throw 'All PCs in the lab have been used up';

            spot.student_id = student_info.id;
            spot.status = 'closed';
            spot.pc_no = usedPCCount;

            spot.save();

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_students_by_tracker (wrap_res, body) {
        try {
            wrap_res.students = await Register.get_students_by_tracker(body.trackerid)

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_attendances (wrap_res, body, { student_info }) {
        try {
            wrap_res.students = await Register.get_attendances(student_info.id)

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async get_stats (wrap_res, body, { student_info }) {
        try {
            const studentModules = await StudentModule.getBystudent(student_info.id)
            const modules = [];

            for (let i = 0; i < studentModules.length; i++) {
                const _m = studentModules[i];

                const all_attendances = await AttendanceTracker.countByModule(_m.id);
                const student_attendances = await Register.countAttendances(_m.id, student_info.id)

                modules.push({
                    code: _m.code,
                    name: _m.name,
                    all_attendances,
                    student_attendances
                })
            }

            wrap_res.modules = modules;
            wrap_res.successful = true;
        } catch (e) { throw e; }

        return wrap_res;
    }
}