import fetch from "../helpers/fetch.js"

import { openModal, closeModal } from "../helpers/modal.js"
import { arrayNotEmpty } from "../helpers/array.js"

import {
    formatLecturerAttendanceTrackers,
    formatStudentAttendanceTrackers,
    formatStudentAttendanceCardTrackers,
    formatAdminAttendanceTrackers
} from "../helpers/format.js"

let interval_state = 0;

let cachedTrackers = [];

const tableHeader = [
    '#', 'Lecturer last name', 'Lecturer initials', 'Module', 'Starts', 'Ends'
]

const allowedColumns = [
    'lastname', 'initials', 'name', 'start_period', 'end_period'
]

export default class AttendanceTracker {
    static readQRCode (tracker_id, module_id) {
        const UseOnSuccess = (scanner) => async (result) => {
            scanner.clear();

            const response = await fetch('/register/spot/sign', {
                body: {
                    registration_spot_id: result,
                    attendance_tracker_id: tracker_id
                }
            });

            let timeout = setTimeout(() => {
                location.href = '/s/attendances';
                
                clearTimeout(timeout)
            }, 1000)

            closeModal('qr-code-reader')
        }

        const UseOnError = (scanner) => () => {
            // scanner.clear()
        }

        const scanner = new Html5QrcodeScanner('qr-code-reader-con', {
            fps: 25,
            qrbox: 250
        })

        scanner.render(UseOnSuccess(scanner), UseOnError(scanner))
        openModal('qr-code-reader')

        $('#qr-code-reader-con')[0].style.border = 'none';

        const status = $('#qr-code-reader-con__status_span')[0]

        status.parentElement.style.display = 'none';
    }

    static async generateQRCode (tracker_id, module_id) {
        const response = await fetch('/register/spot/fetch/latest', {
            body: {
                attendance_tracker_id: tracker_id
            }
        });

        $('#attendance-qr')[0].innerHTML = '';

        var qrcode = new QRCode($('#attendance-qr')[0], {
            width: 300,
            height: 300
        });

        qrcode.makeCode(response.register_unique_no);

        openModal('qr-code')

        if (!interval_state)
            window.int_id = setInterval(() => {
                AttendanceTracker.generateQRCode(tracker_id, module_id);

                interval_state = 1;
            }, 3000)
    }

    static async add () {
        const response = await fetch('/attendance-tracker/add', {
            body: {
                start_period: $('#start-period').val(),
                end_period: $('#end-period').val(),
                module_id: $('#module-1').val(),
                pc_count: $('#pc-count').val()
            }
        })

        if (response.successful) {
            await AttendanceTracker.get_by_lecturer()

            return closeModal('tracker')
        }
    }

    static async delete (tracker_id) {
        const response = await fetch('/attendance-tracker/delete', {
            body: {
                tracker_id
            }
        })

        if (response.successful) {
            await AttendanceTracker.get_by_lecturer()

            return closeModal('tracker')
        }
    }

    static async get_by_lecturer () {
        const response = await fetch('/attendance-tracker/fetch/lecturer')

        if (arrayNotEmpty(response.attendanceTrackers)) {
            $('#no-attendance-trackers').hide();
            
            $('#attendance-tracker-list').html(formatLecturerAttendanceTrackers(response.attendanceTrackers));

            const openQrCodeBtn = $('.table__body__row--attendanceTracker');

            openQrCodeBtn.off();

            openQrCodeBtn.on('click', async (e) => {
                await AttendanceTracker.generateQRCode(
                    e.currentTarget.dataset.attendancetrackerid,
                    e.currentTarget.dataset.attendancetrackermoduleid,
                )
            })

            $('.table__body__row__item__students').on('click', e => {
                location.href = 
                    `/l/attendances?t=${e.currentTarget.dataset.attendancetrackerid}`;
            });

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', async e => {
                await AttendanceTracker.delete(e.currentTarget.dataset.attendancetrackerid);
            })

            return;
        }

        $('#no-attendance-trackers').show();
        return $('#attendance-tracker-list').html('');
    }

    static async get_by_student () {
        const response = await fetch('/attendance-tracker/fetch/student')

        if (arrayNotEmpty(response.attendanceTrackers)) {
            $('#no-attendance-trackers').hide();

            $('#attendance-tracker-list').html(formatStudentAttendanceTrackers(response.attendanceTrackers));
            $('#tracker-card-container').html(formatStudentAttendanceCardTrackers(response.attendanceTrackers));
            
            $('.table__body__row--attendanceTracker').on('click', (e) => {
                AttendanceTracker.readQRCode(e.currentTarget.dataset.attendancetrackerid)
            })
            
            return;
        }

        $('#no-attendance-trackers').show();
        $('#attendance-tracker-list').html('');
        return $('#tracker-card-container').html('');
    }

    static async get_for_admin () {
        const response = await fetch('/attendance-tracker/fetch/admin')

        cachedTrackers = response.attendanceTrackers;

        if (arrayNotEmpty(response.attendanceTrackers)) {
            $('#no-trackers').hide();
            $('#tracker-list').html(formatAdminAttendanceTrackers(response.attendanceTrackers));
            return;
        }

        $('#no-trackers').show();
        return $('#tracker-list').html('');
    }

    static async downloadCSV () {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedTrackers,
                tableHeader,
                allowedColumns,
                reportName: 'trackers'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
}