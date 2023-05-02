const { SQLifier } = require('sqlifier');

module.exports = new (class Register extends SQLifier {
    constructor() {
        super();

        this.schema('register', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            attendance_tracker_id: { type: 'int' },
            student_id: { type: 'int' },
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
})