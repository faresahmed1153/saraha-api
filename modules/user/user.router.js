const { auth } = require("../../middleware/auth");
const { displayProfile, messagesList, updateProfilePic, updateProfile, getProfile } = require("./controller/profile");
const multerData = require("../../services/multer");
const { validation } = require("../../middleware/validation");
const { updateProfileValidator, getProfileValidator, emailValidator, resetValidator, changePasswordValidator } = require("./profile.validation");
const { reset, resetPassword } = require("./controller/resetPassword");
const changePassword = require("./controller/changePassword");
const router = require("express").Router();

router.get("/Myprofile", auth(), displayProfile);
router.get("/messages", auth(), messagesList);
router.get("/profile/:id", validation(getProfileValidator), getProfile);
router.patch("/updateProfile", validation(updateProfileValidator), auth(), updateProfile);
router.patch("/updateProfilePic", multerData.myMulter("users/profilePic", multerData.validateFileMthod.image).single("image"), auth(), updateProfilePic);
router.post("/reset", validation(emailValidator), reset);
router.patch("/reset-password/:token", validation(resetValidator), resetPassword);
router.patch("/changePassword", validation(changePasswordValidator), auth(), changePassword);
module.exports = router;
