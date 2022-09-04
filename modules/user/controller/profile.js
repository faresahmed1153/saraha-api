const messageModel = require("../../../DB/model/message");
const userModel = require("../../../DB/model/User");

const displayProfile = async (req, res) => {
  try {
    console.log(req.user._id);
    const user = await userModel.findById(req.user._id).select("name email profilePic ");

    console.log(user);
    res.json({ message: "Done", user });
  } catch (error) {
    res.json({ message: "catch errr", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id).select("name profilePic");
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "in-valid user account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
const messagesList = async (req, res) => {
  try {
    const messages = await messageModel.find({ reciverId: req.user._id });
    const reciverId = req.user._id;
    res.json({ message: "Done", messages, reciverId });
  } catch (error) {
    res.json({ message: "catch errr", error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);
    if (name != undefined && email != undefined) {
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true }).select("-password");
      if (updatedUser) {
        res.json({ message: "Done", updatedUser });
      } else {
        res.json({ message: "in-valid id" });
      }
    } else if (name != undefined) {
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { name }, { new: true }).select("-password");
      if (updatedUser) {
        res.json({ message: "Done", updatedUser });
      } else {
        res.json({ message: "in-valid id" });
      }
    } else {
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { email }, { new: true }).select("-password");
      if (updatedUser) {
        res.json({ message: "Done", updatedUser });
      } else {
        res.json({ message: "in-valid id" });
      }
    }
  } catch (error) {
    if (error.keyValue) {
      if (error.keyValue.email) {
        res.json({
          message: "email exist",
        });
      }
    } else {
      res.json({ message: "catch err " });
    }
  }
};
const updateProfilePic = async (req, res) => {
  try {
    if (req.fileValidation) {
      res.json({ message: "in-valid file format" });
    } else {
      // const imageUrl = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
      const imageUrl = `${req.destinationFile}/${req.file.filename}`;

      const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { profilePic: imageUrl }, { new: true });
      res.json({ message: "Done" });
    }
  } catch (error) {
    res.json({ message: "catch errr", error });
  }
};

module.exports = {
  displayProfile,
  messagesList,
  updateProfilePic,
  updateProfile,
  getProfile,
};
