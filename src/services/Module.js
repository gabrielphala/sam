const Module = require('../models/Module')
const LecturerModule = require("../models/LecturerModule")

const v = require("../helpers/Validation")
 
module.exports = class ModuleService {
    static async add (wrap_res, body) {
        try {
            v.validate({
                'Module name': { value: body.name, min: 5, max: 30 },
                'Module code': { value: body.code, min: 4, max: 8 }
            });

            await Module.insert({
                name: body.name,
                code: body.code
            })

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async update (wrap_res, body) {
        try {
            v.validate({
                'Module name': { value: body.name, min: 2, max: 30 },
                'Module code': { value: body.code, min: 1, max: 5 }
            });

            await Module.updateModule(body.module_id, body.name, body.code);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async delete (wrap_res, body) {
        try {
            await Module.deleteModule(body.module_id);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async fetch_all (wrap_res) {
        try {
            wrap_res.modules = await Module.fetch_all();

            return wrap_res;
        } catch (e) { throw e; }
    }

    static async searchModules (wrap_res, body) {
        try {
            wrap_res.modules = await Module.searchModules(body.searchValue);

            wrap_res.successful = true;

            return wrap_res;
        } catch (err) { throw err; }
    }

    static async fetch_by_lecturer (wrap_res, _, { lecturer_info }) {
        try {
            const lecturer_modules = await LecturerModule.getByLecturer(lecturer_info.id),
                conditions = [];

            lecturer_modules.forEach((lecturer_module) => {
                return conditions.push({ id: lecturer_module.module_id, is_deleted: false })
            })

            wrap_res.modules = await Module.getByLecturerModules(conditions);

            return wrap_res;
        } catch (e) { throw e; }
    }
}