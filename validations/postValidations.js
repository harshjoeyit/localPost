
const Joi = require('@hapi/joi');

const postCreateValidation = data => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),

        content: Joi.string()
            .required(),

        latitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),

        longitude: Joi.number()
            .min(-180)
            .max(180)
            .required(),

        city: Joi.string()
            .required()
    })

    return schema.validate(data)
}

module.exports.postCreateValidation = postCreateValidation