const { SQLifier } = require('sqlifier');

module.exports = new (class Register extends SQLifier {
    constructor() {
        super();

        this.schema('register', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            attendance_tracker_id: { type: 'int' },
            module_id: { type: 'int' },
            student_id: { type: 'int' },
            pc_no: { type: 'int', length: 3 },
            status: { type: 'varchar', length: 10, default: 'open' },
            unique_no: { type: 'varchar', length: 10 }
        })
    }

    getOpenSpotByAttendanceId (attendance_tracker_id) {
        return this.findOne({
            condition: {
                attendance_tracker_id,
                status: 'open'
            }
        });
    }

    get_students_by_tracker (attendance_tracker_id) {
        return this.find({
            condition: {
                attendance_tracker_id,
                status: 'closed'
            },
            join: {
                ref: 'student',
                id: 'student_id'
            },
        });
    }

    get_attendances (student_id) {
        return this.find({
            condition: {
                student_id,
                status: 'closed'
            },
            join: [
                {
                    ref: 'module',
                    id: 'module_id'
                },
                {
                    ref: 'attendance_tracker',
                    id: 'attendance_tracker_id'
                }
            ]
        });
    }

    countUsedPCs (attendance_tracker_id) {
        return this.count({
            attendance_tracker_id
        });
    }
})