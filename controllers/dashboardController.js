const { User } = require("../models/user");

// * Dashboard Controller
const dashboardController = async (req, res) => {
  try {
    const { email } = req.body;

    const userDet = await User.findOne({ email: email });

    return res.status(400).json({
      success: true,
      message: userDet,
    });
  } catch (error) {
    console.log(error.stack);
    return res.staus(400).json({
      success: false,
      message: "Dashboard route Error",
    });
  }
};

module.exports = { dashboardController };
