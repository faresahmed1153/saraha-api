const router = require("express").Router();
const message = require("./controller/message");
const { validation } = require("../../middleware/validation");
const { sendMessage, deleteMessage } = require("./message.validation");
const { auth } = require("../../middleware/auth");

router.post("/message/:id", validation(sendMessage), message.sendMessage);

router.delete("/message/:id", validation(deleteMessage), auth(), message.deleteMessage);

module.exports = router;
