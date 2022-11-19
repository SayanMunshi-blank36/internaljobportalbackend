const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected");
  } catch (error) {
    console.log(error.stack, "DB not connected");
  }
};

connectDB();

module.exports = { connectDB };
