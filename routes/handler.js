const authRoutes = require("./auth.js");
const dashboardRoutes = require("./dashboard");

module.exports = (app) => {
  app.use("/api", authRoutes);
  app.use("/api", dashboardRoutes);
};
