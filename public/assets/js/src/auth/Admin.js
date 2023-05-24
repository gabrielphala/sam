import fetch from "../helpers/fetch.js"

import { showError } from "../helpers/error.js"

export default class Admin {
    static async sign_in () {
        const response = await fetch('/a/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        })

        if (response.successful)
            return location.href = '/a/modules'

        showError('sign-in-error', response.error)
    }
}