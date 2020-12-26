
const Joi = require('@hapi/joi')

const coordsValidation = data => {
    const schema = Joi.object({
        latitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),
       
        longitude: Joi.number()
            .min(-180)
            .max(180)
            .required()
    })

    return schema.validate(data)
}

module.exports.coordsValidation = coordsValidation