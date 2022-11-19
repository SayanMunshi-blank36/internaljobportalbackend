const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  },
  profilePic: {
    type: String,
  },
  permission: {
    type: String,
    required: true,
  },
  companyUniqueId: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Hashing Password
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password, hashPass) {
  return bcrypt.compareSync(password, hashPass);
};

// Validate Schema
function validateSchema(user) {
  const schema = joi.object().keys({
    username: joi.string().trim().min(1).max(50).required(),
    email: joi.string().trim().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
    permission: joi.string().required(),
    companyUniqueId: joi.string().required(),
  });
  return schema.validate(user);
}

function validateLoginSchema(user) {
  const schema = joi.object().keys({
    email: joi.string().trim().min(1).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = { User, validateSchema, validateLoginSchema };
