import fetch from "../helpers/fetch.js"

import { showError } from "../helpers/error.js"
import { arrayNotEmpty } from "../helpers/array.js"
import { closeModal, openModal } from "../helpers/modal.js"
import { formatAdminLecturers } from "../helpers/format.js"

let cachedLecturers = [];

const tableHeader = [
    '#', 'Last name', 'Initials', 'Staff number', 'Added on'
]

const allowedColumns = [
    'lastname', 'initials', 'staff_no', 'added_on'
]

export default class Lecturer {
    static async add () {
        const modules = [];
        
        try {
            Array.from($('.modules__item')).forEach(field => {
                if (modules.includes(field.value))
                    throw 'Module already added';

                modules.push(field.value)
            });

            const response = await fetch('/lecturer/add', {
                body: {
                    lastname: $('#lecturer-lastname').val(),
                    initials: $('#lecturer-initials').val(),
                    staff_no: $('#lecturer-staff-no').val(),
                    modules
                }
            }) 

            if (response.successful) {
                await Lecturer.fetch_all()

                return closeModal('lecturer')
            }

            throw response.error;
        } catch (error) {
            showError('new-lecturer-error', error);
        }
    }

    static async update () {
        const response = await fetch('/lecturer/update', {
            body: {
                lecturer_id: $('#lecturer-update-id').val(),
                lastname: $('#lecturer-update-lastname').val(),
                initials: $('#lecturer-update-initials').val()
            }
        }) 

        if (response.successful) {
            await Lecturer.fetch_all()

            return closeModal('lecturer-update')
        }

        showError('update-lecturer-error', response.error);
    }

    static async delete (lecturer_id) {
        const response = await fetch('/lecturer/delete', {
            body: {
                lecturer_id
            }
        })

        if (response.successful) {
            await Lecturer.fetch_all()

            return closeModal('lecturer')
        }
    }

    static async sign_in () {
        const response = await fetch('/lecturer/sign-in', {
            body: {
                staff_no: $('#staff-no').val(),
                password: $('#password').val()
            }
        })

        if (response.successful)
            return location.href = '/l/trackers'

        showError('sign-in-error', response.error)
    }

    static async fetch_all () {
        const response = await fetch('/lecturer/fetch/all') 

        cachedLecturers = response.lecturers;

        if (arrayNotEmpty(response.lecturers)) {
            $('#no-lecturers').hide();
            $('#lecturer-list').html(formatAdminLecturers(response.lecturers));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Lecturer.delete(parent.dataset.lecturerid)
            })

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#lecturer-update-id').val(parent.dataset.lecturerid);

                openModal('lecturer-update');
            })

            return;
        }
            
        $('#no-lecturers').show();
        return $('#lecturer-list').html('');
    }

    static async searchLecturers () {
        const response = await fetch('/lecturer/search/all', {
            body: {
                searchValue: $('#search-value').val()
            }
        })

        cachedLecturers = response.lecturers;

        if (arrayNotEmpty(response.lecturers)) {
            $('#no-lecturers').hide();
            $('#lecturer-list').html(formatAdminLecturers(response.lecturers));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Lecturer.delete(parent.dataset.lecturerid)
            })

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#lecturer-update-id').val(parent.dataset.lecturerid);

                openModal('lecturer-update');
            })

            return;
        }

        $('#no-lecturers').show();
        return $('#lecturer-list').html('');
    }

    static async downloadCSV () {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedLecturers,
                tableHeader,
                allowedColumns,
                reportName: 'lecturers'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }
}