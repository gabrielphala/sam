const { SQLifier } = require('sqlifier');

module.exports = new (class Lecturer extends SQLifier {
    constructor () {
        super();

        this.schema('lecturer', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            lastname: { type: 'varchar', length: 15 },
            initials: { type: 'varchar', length: 5 },
            staff_no: { type: 'int', length: 10 },
            password: { type: 'varchar', length: 250 },
            added_on: { type: 'datetime' },
            is_deleted: { type: 'boolean', default: false }
        })
    }

    fetch_all () {
        return this.find({
            condition: {
                is_deleted: false
            }
        });
    }

    updateLecturer (id, lastname, initials) {
        this.update({ id }, {
            lastname,
            initials
        })
    }

    searchLecturers (searchValue) {
        return this.search({
            condition: [
                { initials: searchValue },
                { lastname: searchValue },
                { staff_no: searchValue },
            ]
        })
    }

    deleteLecturer (id) {
        this.update({ id }, { is_deleted: true })
    }
})