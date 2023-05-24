const Student = require('../models/Student')

const v = require("../helpers/Validation")
const jwt = require("../helpers/Jwt");

const { makeMySQLDate } = require("../helpers/Date");
const { hash, isSame } = require('../helpers/Hasher');

const StudentModuleService = require('./StudentModule');

module.exports = class StudentService {
    static async add (wrap_res, body) {
        try {
            v.validate({
                'Last name': { value: body.lastname, min: 2, max: 30 },
                'Initials': { value: body.initials, min: 1, max: 5 },
                'Student no': { value: body.student_no, min: 9, max: 10 }
            });

            if ((await Student.exists({ student_no: body.student_no })).found)
                throw `A student with the staff no: ${body.student_no} already exists`;

            const unselected = body.modules.some((value) => {
                return value == 'select'
            })

            if (unselected) throw 'Please select all modules';

            const new_student = await Student.insert({
                lastname: body.lastname,
                initials: body.initials,
                student_no: body.student_no,
                password: await hash('Password123'),
                added_on: makeMySQLDate()
            })

            StudentModuleService
                .addModules(new_student.id, body.modules);

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

            await Student.updateStudent(body.student_id, body.lastname, body.initials);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async delete (wrap_res, body) {
        try {
            await Student.deleteStudent(body.student_id);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async sign_in (wrap_res, body) {
        try {
            v.validate({
                'Student no': { value: body.student_no, min: 9, max: 10 },
                'Password': { value: body.password, min: 8, max: 16 }
            });

            const studentDetails = await Student.findOne({
                condition: { student_no: body.student_no, is_deleted: false }
            });

            if (!studentDetails)
                throw 'Student no is not registered';

            if (!(await isSame(studentDetails.password, body.password)))
                throw 'Password is incorrect';

            const details = studentDetails.toObject();

            delete details.password;

            const tokens = jwt.get_cookie_tokens(details);
            wrap_res.set_cookie('tf_student', tokens);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async fetch_all (wrap_res) {
        try {
            wrap_res.students = await Student.fetch_all();

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async searchStudents (wrap_res, body) {
        try {
            wrap_res.students = await Student.searchStudents(body.searchValue);

            wrap_res.successful = true;

            return wrap_res;
        } catch (err) { throw err; }
    }
}