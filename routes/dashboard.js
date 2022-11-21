const express = require("express");
const { dashboardController } = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/authMiddleware");
const router = express.Router();

// * Dashboard
router.get("/dashboard", isLoggedIn, dashboardController);

module.exports = router;
