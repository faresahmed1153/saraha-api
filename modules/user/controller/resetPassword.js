const userModel = require("../../../DB/model/User");
const { sendEmail } = require("../../../services/email");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const reset = async (req, res) => {
  try {
    const { email } = req.body;

    const User = await userModel.findOne({ email });
    if (!User) {
      res.json({ message: "email doesn't exist" });
    } else {
      const token = jwt.sign({ email }, process.env.tokenSignature, { expiresIn: "1h" });
      const link = `https://saraha.vercel.app/reset-password/${token}`;

      const message = `<a href="${link}">click me to reset password</a>`;
      sendEmail(email, message);
      res.json({ message: "Done" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const decoded = jwt.verify(token, process.env.tokenSignature);
    if (!decoded) {
      res.json({ message: "invalid token" });
    } else {
      const hashedPassword = await bycrpt.hash(password, parseInt(process.env.saltRound));
      const user = await userModel.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword }, { new: true });
      if (!user) {
        res.json({ message: "invalid user" });
      } else {
        res.json({ message: "Done" });
      }
    }
  } catch (error) {
    if (error?.name == "TokenExpiredError") {
      res.json({ message: "The token has expired pls make a new request", error });
    } else {
      res.json({ message: "catch error", error });
    }
  }
};
module.exports = { reset, resetPassword };
