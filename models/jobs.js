const mongoose = require("mongoose");
const joi = require("joi");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  desc: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

function validateJobSchema(jobSchema) {
  const schema = joi.object.key({
    title: joi.string().min(1).max(500).required(),
    desc: joi.string().min(1).max(500).required(),
  });

  return schema.validate(jobSchema);
}

const Job = mongoose.model("jobs", jobSchema);

module.exports = { Job, jobSchema, validateJobSchema };
