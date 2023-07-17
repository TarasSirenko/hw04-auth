const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

function validate(schema, req, res, next) {
  const validationResult = schema.validate(req.body);
  // console.log(validationResult.error.details);
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
  } else {
    next();
  }
}


module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      phone: Joi.string()
        .pattern(/^(?:\+38)?0\d{9}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid phone number format",
          "any.required": "Phone number is required",
        }),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      favorite: Joi.boolean().optional(),
    });

    validate(schema, req, res, next);
  },

  updatePostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),

      phone: Joi.string()
        .pattern(/^(?:\+38)?0\d{9}$/)

        .messages({
          "string.pattern.base": "Invalid phone number format",
          "any.required": "Phone number is required",
        })
        .optional(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
    });

    validate(schema, req, res, next);
  },

  updateContactStatusValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    validate(schema, req, res, next);
  },
  userInfoValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{4,16}$/)
  .required()
  .messages({
    'string.pattern.base': 'Пароль должен содержать только английские буквы и цифры',
    
  })
    });

    validate(schema, req, res, next);
  },
};

