const { SQLifier } = require('sqlifier');

module.exports = new (class LecturerModule extends SQLifier {
    constructor() {
        super();

        this.schema('lecturer_module', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            lecturer_id: { type: 'int', ref: 'lecturer' },
            module_id: { type: 'int', ref: 'module' }
        })
    }

    getByLecturer (lecturer_id) {
        return this.find({
            condition: { lecturer_id }
        })
    }
})