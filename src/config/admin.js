const Admin = require("../models/Admin");

const Hasher = require("../helpers/Hasher");

(async () => {
    if ((await Admin.exists({ email: 'admin@sam.com' })).found)
        return;

    Admin.insert({
        firstname: "Summer",
        lastname: "Johnsons",
        email: "admin@sam.com",
        password: await Hasher.hash("Password123")
    })
})();