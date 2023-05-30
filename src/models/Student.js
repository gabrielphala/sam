const { SQLifier, SQLDate } = require('sqlifier');

module.exports = new (class Student extends SQLifier {
    constructor () {
        super();

        this.schema('student', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            lastname: { type: 'varchar', length: 15 },
            initials: { type: 'varchar', length: 5 },
            student_no: { type: 'int', length: 10 },
            password: { type: 'varchar', length: 250 },
            added_on: { type: 'datetime', default: SQLDate.now },
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

    searchStudents (searchValue) {
        return this.search({
            condition: [
                { initials: searchValue },
                { lastname: searchValue },
                { student_no: searchValue },
            ]
        })
    }

    updateStudent (id, lastname, initials) {
        this.update({ id }, {
            lastname,
            initials
        })
    }

    deleteStudent (id) {
        this.update({ id }, { is_deleted: true })
    }
})