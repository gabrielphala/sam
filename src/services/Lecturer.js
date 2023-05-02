const Lecturer = require('../models/Lecturer')

const jwt = require("../helpers/Jwt");
const v = require("../helpers/Validation")

const { makeMySQLDate } = require("../helpers/Date");
const { hash, isSame } = require('../helpers/Hasher');

const LecturerModuleService = require('./LecturerModule');

module.exports = class LecturerService {
    static async add (wrap_res, body) {
        try {
            v.validate({
                'Last name': { value: body.lastname, min: 2, max: 30 },
                'Initials': { value: body.initials, min: 1, max: 5 },
                'Staff no': { value: body.staff_no, min: 9, max: 10 }
            });

            if ((await Lecturer.exists({ staff_no: body.staff_no })).found)
                throw `A lecturer with the staff no: ${body.staff_no} already exists`;

            const unselected = body.modules.some((value) => {
                return value == 'select'
            })

            if (unselected) throw 'Please select all modules';

            const new_lecturer = await Lecturer.insert({
                lastname: body.lastname,
                initials: body.initials,
                staff_no: body.staff_no,
                password: await hash('Password123'),
                added_on: makeMySQLDate()
            })

            LecturerModuleService
                .addModules(new_lecturer.id, body.modules);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async update (wrap_res, body) {
        try {
            v.validate({
                'Last name': { value: body.lastname, min: 2, max: 30 },
                'Initials': { value: body.initials, min: 1, max: 5 }
            });

            await Lecturer.updateLecturer(body.lecturer_id, body.lastname, body.initials);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async delete (wrap_res, body) {
        try {
            await Lecturer.deleteLecturer(body.lecturer_id);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async sign_in (wrap_res, body) {
        try {
            v.validate({
                'Staff no': { value: body.staff_no, min: 9, max: 10 },
                'Password': { value: body.password, min: 8, max: 16 }
            });

            const lecturerDetails = await Lecturer.findOne({
                condition: { staff_no: body.staff_no, is_deleted: false }
            });

            if (lecturerDetails.isEmpty)
                throw 'Staff no or Password is incorrect';

            if (!(await isSame(lecturerDetails.password, body.password)))
                throw 'Staff no or Password is incorrect';

            const details = lecturerDetails.toObject();
            
            delete details.password;

            const tokens = jwt.get_cookie_tokens(details);
            wrap_res.set_cookie('tf_lecturer', tokens);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async fetch_all (wrap_res) {
        try {
            wrap_res.lecturers = await Lecturer.fetch_all();

            return wrap_res;
        } catch (e) { throw e; }
    }
}