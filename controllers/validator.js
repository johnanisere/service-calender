const Joi = require('@hapi/joi')

exports.validator = body => {
    const schema = {
        title: Joi.string().max(50),
        location: Joi.string().required(),
        description: Joi.string().min(10),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        timezone: Joi.string().required(),
        devemail: Joi.string()
            .email()
            .required(),
    }

    return Joi.validate(body, schema)
}
