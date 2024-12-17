const { StatusCodes } = require('http-status-codes');
const { Validator } = require('node-input-validator');

// Middleware function for validating request bodies based on provided field names
module.exports = function (Validation) {
    return async function (req, res, next) {
        try {
            const validationObj = {}

            for (const key of Validation) {
                validationObj[key] = getValidation(key);
            }

            const v = new Validator(req.body, validationObj);
            const matched = await v.check();

            if (!matched) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation error.", statusCode: StatusCodes.BAD_REQUEST, data: v.errors });
            }
            next()
        } catch (err) {
            console.log("-----Validations Middleware err ----", err)
            return res.status(StatusCodes.BAD_REQUEST).json({ data: [], message: 'Please check Validation code', statusCode: StatusCodes.BAD_REQUEST });
        }
    }
}

// Function to get validation rules for specific fields
function getValidation(fieldName) {
    let validate;
    switch (fieldName) {
        case "email":
            validate = "required|email"
            break;
        case "id":
            validate = "required|mongoId"
            break;
        default:
            validate = "required"
            break;
    }
    return validate
}