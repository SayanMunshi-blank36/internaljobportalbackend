const { User, validateSchema, validateLoginSchema } = require("../models/user");

// * Register Controller
const registerController = async (req, res) => {
  try {
    const submittedUser = ({
      username,
      email,
      password,
      permission,
      companyUniqueId,
    } = req.body);

    const { error } = validateSchema(submittedUser);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    // Duplicate User Check
    const alreadyUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Unique companyUniqueId check for permission: company
    if (permission === "company") {
      const alreadyUniqueId = await User.findOne({
        $and: [
          {
            companyUniqueId: companyUniqueId,
          },
          {
            permission: "company",
          },
        ],
      });

      if (alreadyUniqueId) {
        return res.status(400).json({
          success: false,
          message:
            "Company with same ID already exists. Please choose an uniqueId.",
        });
      }
    }

    const user = new User({
      username,
      email,
      permission,
      companyUniqueId,
    });

    user.password = await user.generateHash(password);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Registration is successful",
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      success: false,
      message: "Error Occured in Registration",
    });
  }
};

// * Login Controller
const loginController = async (req, res) => {
  try {
    const submittedUser = ({ email, password } = req.body);

    const { error } = validateLoginSchema(submittedUser);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const userLogin = new User();
    const validUser = await userLogin.validPassword(
      password,
      findUser.password
    );

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "Not a valid Password",
      });
    }

    await User.findOneAndUpdate({ email: email }, { isLoggedIn: true });

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      success: false,
      message: "Login Unsuccessful",
    });
  }
};

module.exports = { registerController, loginController };
