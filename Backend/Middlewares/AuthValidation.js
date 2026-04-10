import Joi from "joi";

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required().messages({
      "string.min": "Name must be at least 4 characters long.",
      "string.max": "Name cannot exceed 100 characters.",
      "any.required": "Name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$"),
      )
      .messages({
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character.",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password cannot exceed 20 characters.",
        "any.required": "Password is required.",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$"),
      )
      .messages({
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character.",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password cannot exceed 20 characters.",
        "any.required": "Password is required.",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export { signupValidation, loginValidation };
