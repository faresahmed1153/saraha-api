const userModel = require("../../../DB/model/User");
const messageModel = require("../../../DB/model/message");
const sendMessage = async (req, res) => {
  try {
    const { id } = req.params; // reciver id
    const { messageBody } = req.body;
    const user = await userModel.findById(id).select("name email");
    if (user) {
      const message = await messageModel.insertMany({
        messageBody,
        reciverId: user._id,
      });
      res.json({ message: "Done" });
    } else {
      res.json({ message: "in-valid user account" });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; // message id
    const message = await messageModel.deleteOne({ _id: id, reciverId: req.user._id });
    res.json({ message: "Done", message });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

module.exports = {
  sendMessage,
  deleteMessage,
};
