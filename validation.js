//Validation 
const Joi = require('@hapi/joi');


//Register validation (we are making it as a function because we might have multiple schemas later)

const registerValidation=(data)=>{
    const schema =Joi.object({
        name:Joi.string()
            .min(6)
            .required(),
        email:Joi.string()
            .min(6)
            .required()
            .email(),
        password:Joi.string()
            .min(6)
            .required()
    });

    const validation=schema.validate(data)
    return validation
}

const loginValidation=(data)=>{
    const schema =Joi.object({
        email:Joi.string()
            .min(6)
            .required()
            .email(),
        password:Joi.string()
            .min(6)
            .required()
    });

    const validation=schema.validate(data)
    return validation
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;

