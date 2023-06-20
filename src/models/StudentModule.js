const { SQLifier } = require('sqlifier');

module.exports = new (class StudentModule extends SQLifier {
    constructor() {
        super();

        this.schema('student_module', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            student_id: { type: 'int', ref: 'student' },
            module_id: { type: 'int', ref: 'module' }
        })
    }

    getBystudent (student_id) {
        return this.find({
            condition: { student_id },
            join: {
                ref: 'module',
                id: 'module_id'
            }
        })
    }

    getStudentsByModule (module_id) {
        return this.find({
            condition: { module_id },
            join: [
                {
                    ref: 'student',
                    id: 'student_id'
                },
                {
                    ref: 'module',
                    id: 'module_id'
                }
            ]
        })
    }
})