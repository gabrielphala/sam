import fetch from "../helpers/fetch.js"
import { getQuery } from "../helpers/urlquery.js";

import { arrayNotEmpty } from "../helpers/array.js"

import {
    formatLecturerStudents,
    formatStudentAttendanceHistory,
    formatStudentStats,
    formatModuleStudentStats,
    formatStatsCardTrackers,
    formatAttendanceCards
} from "../helpers/format.js"

let cachedStudents = [];

const tableHeader = [
    '#', 'Lastname', 'Initials', 'Student no'
]

const allowedColumns = [
    'lastname', 'initials', 'student_no'
]

let cachedAttendance = [];

const tableAHeader = [
    '#', 'Student name', 'Module name', 'Module code', 'All classes', 'Attended classes', 'Attended classes (%)'
]

const allowedAColumns = [
    'lastname', 'name', 'code', 'all_attendances', 'student_attendances', 'perc'
]

export default class AttendanceTracker {
    static async get_students_by_tracker () {
        const response = await fetch('/register/get-students-by-tracker', {
            body: {
                trackerid: getQuery('t')
            }
        });

        cachedStudents = response.students;

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
            $('#attendance-card-container').html(formatAttendanceCards(response.students));
            return;
        }

        $('#no-attendances').show();
        $('#attendance-card-container').html('');
        return $('#attendance-list').html('');
    }

    static async get_stats () {
        const response = await fetch('/register/get-stats');

        if (arrayNotEmpty(response.modules)) {
            $('#no-stats').hide();
            $('#stats-list').html(formatStudentStats(response.modules));
            $('#stats-card-container').html(formatStatsCardTrackers(response.modules));
            return;
        }

        $('#no-stats').show();
        $('#stats-card-container').html('');
        return $('#stats-list').html('');
    }

    static async get_students_stats_module () {
        const response = await fetch('/register/get-module-stats', {
            body: {
                module_id: getQuery('m')
            }
        });

        cachedAttendance = response.students;

        if (arrayNotEmpty(response.students)) {
            $('#no-stats').hide();
            $('#stats-list').html(formatModuleStudentStats(response.students));
            return;
        }

        $('#no-stats').show();
        return $('#stats-list').html('');  
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

    static async downloadReportCSV () {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedAttendance,
                tableHeader: tableAHeader,
                allowedColumns: allowedAColumns,
                reportName: 'student-attendance'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
}