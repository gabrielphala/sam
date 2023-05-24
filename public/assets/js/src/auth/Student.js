import fetch from "../helpers/fetch.js"

import { showError } from "../helpers/error.js"
import { closeModal, openModal } from "../helpers/modal.js"
import { arrayNotEmpty } from "../helpers/array.js"
import { formatSelect, formatAdminStudents } from "../helpers/format.js"

let cachedStudents = [];

const tableHeader = [
    '#', 'Last name', 'Initials', 'Student number', 'Added on'
]

const allowedColumns = [
    'lastname', 'initials', 'student_no', 'added_on'
]

export default class Student {
    static async add () {
        const modules = [];
        
        try {
            Array.from($('.modules__item')).forEach(field => {
                if (modules.includes(field.value))
                    throw 'Module already added';

                modules.push(field.value)
            });

            const response = await fetch('/student/add', {
                body: {
                    lastname: $('#student-lastname').val(),
                    initials: $('#student-initials').val(),
                    student_no: $('#student-no').val(),
                    modules
                }
            }) 

            if (response.successful) {
                await Student.fetch_all()

                return closeModal('student')
            }

            throw response.error;
        } catch (error) {
            showError('new-student-error', error);
        }
    }

    static async update () {
        const response = await fetch('/student/update', {
            body: {
                student_id: $('#student-update-id').val(),
                lastname: $('#student-update-lastname').val(),
                initials: $('#student-update-initials').val()
            }
        }) 

        if (response.successful) {
            await Student.fetch_all()

            return closeModal('student-update')
        }

        showError('update-student-error', response.error);
    }

    static async delete (student_id) {
        const response = await fetch('/student/delete', {
            body: {
                student_id
            }
        })

        if (response.successful) {
            await Student.fetch_all()

            return closeModal('student')
        }
    }

    static async sign_in () {
        const response = await fetch('/student/sign-in', {
            body: {
                student_no: $('#student-no').val(),
                password: $('#password').val()
            }
        })

        if (response.successful)
            return location.href = '/s/attendance-trackers'

        showError('sign-in-error', response.error)
    }

    static async fetch_all () {
        const response = await fetch('/student/fetch/all') 

        cachedStudents = response.students;

        if (arrayNotEmpty(response.students)) {
            $('#no-students').hide();
            $('#student-list').html(formatAdminStudents(response.students));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Student.delete(parent.dataset.studentid)
            });

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#student-update-id').val(parent.dataset.studentid);

                openModal('student-update');
            })

            return;
        }
            
        $('#no-students').show();
        return $('#student-list').html('');
    }

    static async searchStudents () {
        const response = await fetch('/student/search/all', {
            body: {
                searchValue: $('#search-value').val()
            }
        })

        cachedStudents = response.students;

        if (arrayNotEmpty(response.students)) {
            $('#no-students').hide();
            $('#student-list').html(formatAdminStudents(response.students));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Student.delete(parent.dataset.studentid)
            });

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#student-update-id').val(parent.dataset.studentid);

                openModal('student-update');
            })

            return;
        }

        $('#no-students').show();
        return $('#student-list').html('');
    }

    static async downloadCSV () {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedStudents,
                tableHeader,
                allowedColumns,
                reportName: 'students'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
}