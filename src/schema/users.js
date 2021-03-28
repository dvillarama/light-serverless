const Joi = require('joi');
const validate = require('./validate');

/**
 *  The path parameters should include an id.
 */
const pathSchema = Joi.object({
  id: Joi.number().integer().required(),
});

/**
 *  On create, you are required to pass the following parameters.
 */
const createSchema = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  email: Joi.string().max(255).required(),
  uid: Joi.string().max(32).required(),
});

/**
 *  On update, you can only update the following fields
 */
const updateSchema = Joi.object({
    firstName: Joi.string().max(255).optional(),
    lastName: Joi.string().max(255).optional(),
});

module.exports = {
    validatePath: obj => validate(createPath, obj),
    validateCreate: obj => validate(createSchema, obj),
    validateUpdate: obj => validate(updateSchema, obj),
};
