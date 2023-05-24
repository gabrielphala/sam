const Admin = require('../models/Admin')

const v = require("../helpers/Validation")
const jwt = require("../helpers/Jwt");

const { isSame } = require('../helpers/Hasher');

module.exports = class AdminService {
    static async sign_in (wrap_res, body) {
        try {
            v.validate({
                'Email address': { value: body.email, min: 4, max: 40 },
                'Password': { value: body.password, min: 8, max: 16 }
            });

            const adminDetails = await Admin.findOne({
                condition: { email: body.email }
            });

            if (!adminDetails)
                throw 'Email address is incorrect';

            if (!(await isSame(adminDetails.password, body.password)))
                throw 'Password is incorrect';

            const details = adminDetails.toObject();

            delete details.password;

            const tokens = jwt.get_cookie_tokens(details);
            wrap_res.set_cookie('tf_admin', tokens);

            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }
}