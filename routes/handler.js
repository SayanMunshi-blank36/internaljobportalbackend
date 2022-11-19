const authRoutes = require("./auth.js");

module.exports = (app) => {
  app.use("/api", authRoutes);
};
