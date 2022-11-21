// * Login middleware
const isLoggedIn = (req, res, next) => {
  const isLoggedIn = req.header("isLoggedIn");

  if (!isLoggedIn) {
    return res.status(400).json({
      success: false,
      message: "User is not Logged In",
    });
  }

  next();
};

module.exports = { isLoggedIn };
