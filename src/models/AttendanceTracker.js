const { SQLifier } = require('sqlifier');

module.exports = new (class AttendanceTracker extends SQLifier {
    constructor() {
        super();

        this.schema('attendance_tracker', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            attendance_count: { type: 'int', length: 3, default: 0 },
            lecturer_id: { type: 'int', ref: 'lecturer' },
            module_id: { type: 'int', ref: 'module' },
            start_period: { type: 'datetime' },
            end_period: { type: 'datetime' },
            status: { type: 'varchar', length: 20, default: 'open' },
            is_deleted: { type: 'boolean', default: false },
        })
    }

    getById (id) {
        return this.findOne({
            condition: { id }
        })
    }

    getByLecturer (lecturer_id) {
        return this.find({
            condition: { lecturer_id, is_deleted: false },
            join: {
                ref: 'module',
                id: 'module_id'
            }
        })
    }

    getForAdmin () {
        return this.find({
            join: [
                {
                    ref: 'module',
                    id: 'module_id'
                },
                {
                    ref: 'lecturer',
                    id: 'lecturer_id'
                }
            ]
        })
    }

    getByStudentModules (condition) {
        return this.find({
            condition
        })
    }

    deleteTracker (id) {
        this.update({ id }, { is_deleted: true, status: 'closed' })
    }
})