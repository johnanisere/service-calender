const Joi = require('@hapi/joi');

exports.validator = (body) => {
  {summary, location, description, attendees, reminders }
  const schema = {
    summary: Joi.string().max(50),
    location: Joi.string().required(),
    description: Joi.string().min(10),
    attendees: Joi.string().email().required(),
    reminders: Joi.string().required()
  }

  return Joi.validate(body, schema)
}