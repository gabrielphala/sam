import fetch from "../helpers/fetch.js"
import { getQuery } from "../helpers/urlquery.js";

import { arrayNotEmpty } from "../helpers/array.js"

import {
    formatLecturerStudents,
    formatStudentAttendanceHistory
} from "../helpers/format.js"

let cachedTrackers = [];

const tableHeader = [
    '#', 'Lecturer last name', 'Lecturer initials', 'Module', 'Starts', 'Ends'
]

const allowedColumns = [
    'lastname', 'initials', 'name', 'start_period', 'end_period'
]

export default class AttendanceTracker {
    static async get_students_by_tracker () {
        const response = await fetch('/register/get-students-by-tracker', {
            body: {
                trackerid: getQuery('t')
            }
        });

        // cachedTrackers = response.attendanceTrackers;

        if (arrayNotEmpty(response.students)) {
            $('#no-attendances').hide();
            $('#attendance-list').html(formatLecturerStudents(response.students));
            return;
        }

        $('#no-attendances').show();
        return $('#attendance-list').html('');
    }

    static async get_attendances () {
        const response = await fetch('/register/get-attendances');

        // cachedTrackers = response.attendanceTrackers;

        if (arrayNotEmpty(response.students)) {
            $('#no-attendances').hide();
            $('#attendance-list').html(formatStudentAttendanceHistory(response.students));
            return;
        }

        $('#no-attendances').show();
        return $('#attendance-list').html('');
    }
}