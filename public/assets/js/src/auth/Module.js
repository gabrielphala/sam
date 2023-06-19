import fetch from "../helpers/fetch.js"

import { showError } from "../helpers/error.js"
import { closeModal, openModal } from "../helpers/modal.js"
import { arrayNotEmpty } from "../helpers/array.js"
import { formatAdminModules, formatSelect } from "../helpers/format.js"

let cachedModules = [];

const tableHeader = [
    '#', 'Module name', 'Module code', 'Added on'
]

const allowedColumns = [
    'name', 'code', 'added_on'
]

export default class Module {
    static async add () {
        const response = await fetch('/module/add', {
            body: {
                name: $('#module-name').val(),
                code: $('#module-code').val()
            }
        }) 

        if (response.successful) {
            await Module.fetch_all()

            return closeModal('module')
        }

        showError('new-module-error', response.error);
    }

    static async update () {
        const response = await fetch('/module/update', {
            body: {
                module_id: $('#module-update-id').val(),
                name: $('#module-update-name').val(),
                code: $('#module-update-code').val()
            }
        }) 

        if (response.successful) {
            await Module.fetch_all()

            return closeModal('module-update')
        }

        showError('update-module-error', response.error);
    }

    static async delete (module_id) {
        const response = await fetch('/module/delete', {
            body: {
                module_id
            }
        }) 

        if (response.successful) {
            await Module.fetch_all()

            return closeModal('module')
        }
    }

    static async fetch_all () {
        const response = await fetch('/module/fetch/all') 

        cachedModules = response.modules;

        if (arrayNotEmpty(response.modules)) {
            $('#no-modules').hide();

            $('#module-list').html(formatAdminModules(response.modules));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Module.delete(parent.dataset.moduleid)
            })

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#module-update-id').val(parent.dataset.moduleid);

                openModal('module-update');
            })

            return;
        }
            
        $('#no-modules').show();
        return $('#module-list').html('');
    }

    static async searchModules () {
        const response = await fetch('/module/search/all', {
            body: {
                searchValue: $('#search-value').val()
            }
        })

        cachedModules = response.modules;

        if (arrayNotEmpty(response.modules)) {
            $('#no-modules').hide();

            $('#module-list').html(formatAdminModules(response.modules));

            const deleteBtn = $('.table__body__row__item__delete');

            deleteBtn.off();

            deleteBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                Module.delete(parent.dataset.moduleid)
            })

            const editBtn = $('.table__body__row__item__edit');

            editBtn.off();

            editBtn.on('click', e => {
                const parent = e.currentTarget.parentElement.parentElement;

                $('#module-update-id').val(parent.dataset.moduleid);

                openModal('module-update');
            })

            return;
        }

        $('#no-modules').show();
        return $('#module-list').html('');
    }

    static async downloadCSV () {
        const response = await fetch('/download/csv', {
            body: {
                data: cachedModules,
                tableHeader,
                allowedColumns,
                reportName: 'modules'
            }
        });

        if (response.successful) {
            const anchor = $('#download-anchor')

            anchor.attr('href', `/assets/downloads/tmp/${response.filename}`)

            anchor[0].click();
        }
    }

    static async load_modules () {
        const response = await fetch('/module/fetch/all') 

        $('#edit-module-1').html(formatSelect(response.modules));
        return $('#module-1').html(formatSelect(response.modules));
    }

    static async load_modules_by_lecturer () {
        const response = await fetch('/module/fetch/lecturer') 

        $('#edit-module-1').html(formatSelect(response.modules));
        return $('#module-1').html(formatSelect(response.modules));
    }
}