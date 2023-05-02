const { SQLifier } = require('sqlifier');

module.exports = new (class Module extends SQLifier {
    constructor () {
        super();

        this.schema('module', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            name: { type: 'varchar', length: 30 },
            code: { type: 'varchar', length: 8 },
            added_on: { type: 'datetime' },
            is_deleted: { type: 'boolean', default: false }
        })
    }

    fetch_by_id (id) {
        return this.findOne({
            condition: {
                id
            }
        });   
    }

    fetch_all () {
        return this.find({
            condition: {
                is_deleted: false
            }
        });
    }

    getByLecturerModules (condition) {
        return this.find({
            condition
        })
    }

    updateModule (id, name, code) {
        this.update({ id }, {
            name,
            code
        })
    }

    deleteModule (id) {
        this.update({ id }, { is_deleted: true })
    }
})