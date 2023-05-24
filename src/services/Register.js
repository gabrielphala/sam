const AttendanceTracker = require('../models/AttendanceTracker')
const Register = require('../models/Register')

const String = require("../helpers/String");

module.exports = class RegisterService {
    static async get_latest_spot (wrap_res, body, store) {
        try {
            let latest_spot = await Register.getOpenSpotByAttendanceId(body.attendance_tracker_id)
            
            if (!latest_spot) {
                latest_spot = await Register.insert({
                    attendance_tracker_id: body.attendance_tracker_id,
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
            
            tracker.attendance_count++;

            tracker.save();

            const spot = await Register.findOne({ unique_no: body.registration_spot_id, status: 'open' })

            if (!spot)
                throw 'QR Code has expired or has been used';

            spot.student_id = student_info.id;
            spot.status = 'closed';

            spot.save();

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }
}