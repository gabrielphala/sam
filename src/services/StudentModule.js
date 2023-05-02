const StudentModule = require('../models/StudentModule')

module.exports = class StudentModuleService {
    static addModules (student_id, modules) {
        try {
            modules.forEach(async module_id => {
                await StudentModule.insert({
                    student_id,
                    module_id
                })
            });
            
        } catch (e) { throw e; }
    }
}