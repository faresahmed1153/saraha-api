const userModel = require("../../../DB/model/User");
const bcrypt = require("bcryptjs");
const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      res.json({ message: "invalid user" });
    } else {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (match) {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.saltRound));
        const updated = await userModel.findOneAndUpdate({ _id: req.user._id }, { password: hashedPassword }, { new: true });
        if (!updated) {
          res.json({ message: "invalid user" });
        } else {
          res.json({ message: "Done" });
        }
      } else {
        res.json({ message: "wrong password" });
      }
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
module.exports = changePassword;
