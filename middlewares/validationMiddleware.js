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
          "string.pattern.base":
            "Пароль должен содержать только английские буквы и цифры",
        }),
    });

    validate(schema, req, res, next);
  },

  addUserValidation: (req, res, next) => {
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
          "string.pattern.base":
            "Пароль должен содержать только английские буквы и цифры",
        }),
      phone: Joi.string()
        .pattern(/^(?:\+38)?0\d{9}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid phone number format",
          "any.required": "Phone number is required",
        }),
    });

    validate(schema, req, res, next);
  },
  addToolValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "Name is required for the tool.",
      }),
      type: Joi.string()
        .valid("hand tool", "power tool", "Gasoline-powered tools")
        .default("hand tool")
        .required()
        .messages({
          "any.required": "Type is required for the tool.",
          "any.only": "Invalid tool type.",
        }),
      toolPicture: Joi.string().required().messages({
        "any.required": "Tool picture is required.",
      }),
      serialNumber: Joi.string().required().messages({
        "any.required": "Serial number is required.",
      }),
      status: Joi.string()
        .valid("available", "rented", "broken")
        .default("available"),
      price: Joi.number().required().messages({
        "any.required": "Price is required.",
        "number.base": "Price must be a number.",
      }),
      tags: Joi.array()
        .items(Joi.string())
        .default(function () {
          return [this.name];
        }),
    });

    validate(schema, req, res, next);
  },
  updateUserStatusValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string()
        .valid("client", "seller", "manager", "director")
        .required(),
      userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    validate(schema, req, res, next);
  },

  updateUserAccessValidation: (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      storeId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    validate(schema, req, res, next);
  },

  updateUserStatisticsValidation: (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      resultOfCooperation: Joi.string()
        .valid("GoodOrders", "OverdueOrders", "BrokenTool")
        .required(),
    });
    validate(schema, req, res, next);
  },

  createStoreValidation: (req, res, next) => {
    const locationSchema = Joi.object({
      country: Joi.string().valid("Украина", "Ukraine", "Україна").required(),
      region: Joi.string().min(2).max(50).required(),
      city: Joi.string().min(2).max(50).required(),
      street: Joi.string().min(2).max(100).required(),
      houseNumber: Joi.string().min(1).max(10).required(),
      apartment: Joi.string().min(1).max(10).allow(null),
    });

    const schema = Joi.object({
      location: locationSchema,
      phoneNumber: Joi.string().required(),
    });

    validate(schema, req, res, next);
  },
  updateStaffValidation: (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      storeId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      role: Joi.string().valid("manager", "seller").required(),
    });

    validate(schema, req, res, next);
  },
  updatePhoneNumberValidation: (req, res, next) => {
    const schema = Joi.object({
      phone: Joi.string()
        .pattern(/^(?:\+38)?0\d{9}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid phone number format",
          "any.required": "Phone number is required",
        }),
    });

    validate(schema, req, res, next);
  },
  updateScheduleValidation: (req, res, next) => {
    const timeFormatRegex =
      /^(Closed|\d{1,2}:\d{2} (?:AM|PM) - \d{1,2}:\d{2} (?:AM|PM))$/;
    const daySchema = Joi.string()
      .regex(timeFormatRegex)
      .default("9:00 AM - 6:00 PM");
    const schema = Joi.object().keys({
      monday: daySchema,
      tuesday: daySchema,
      wednesday: daySchema,
      thursday: daySchema,
      friday: daySchema,
      saturday: daySchema.default("9:00 AM - 1:00 PM"),
      sunday: daySchema.default("Closed"),
    });

    validate(schema, req, res, next);
  },
};



// const addressSchema = Joi.object({
//   country: Joi.string().valid("Украина").required(),
//   region: Joi.string().min(2).max(50).required(),
//   city: Joi.string().min(2).max(50).required(),
//   street: Joi.string().min(2).max(100).required(),
//   houseNumber: Joi.string().min(1).max(10).required(),
//   apartment: Joi.string().min(1).max(10).allow(null),
// });