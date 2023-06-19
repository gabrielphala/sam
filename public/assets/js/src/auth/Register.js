import fetch from "../helpers/fetch.js"
import { getQuery } from "../helpers/urlquery.js";

import { arrayNotEmpty } from "../helpers/array.js"

import {
    formatLecturerStudents,
    formatStudentAttendanceHistory,
    formatAttendanceCards
} from "../helpers/format.js"

let cachedStudents = [];

const tableHeader = [
    '#', 'Lastname', 'Initials', 'Student no'
]

const allowedColumns = [
    'lastname', 'initials', 'student_no'
]

export default class AttendanceTracker {
    static async get_students_by_tracker () {
        const response = await fetch('/register/get-students-by-tracker', {
            body: {
                trackerid: getQuery('t')
            }
        });

        cachedStudents = response.students;

        console.log(cachedStudents);

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

        console.log(formatAttendanceCards(response.students))

        if (arrayNotEmpty(response.students)) {
            $('#no-attendances').hide();
            $('#attendance-list').html(formatStudentAttendanceHistory(response.students));
            $('#attendance-card-container').html(formatAttendanceCards(response.students));
            return;
        }

        $('#no-attendances').show();
        $('#attendance-card-container').html('');
        return $('#attendance-list').html('');
    }

    static async downloadCSV() {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedStudents,
                tableHeader,
                allowedColumns,
                reportName: 'student-register'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
}