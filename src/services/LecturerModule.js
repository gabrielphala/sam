const LecturerModule = require('../models/LecturerModule')

module.exports = class LecturerModuleService {
    static addModules (lecturer_id, modules) {
        try {
            modules.forEach(async module_id => {
                await LecturerModule.insert({
                    lecturer_id,
                    module_id
                })
            });
            
        } catch (e) { throw e; }
    }
}