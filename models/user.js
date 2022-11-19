const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const authSchemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

module.exports = { User, authSchemas };