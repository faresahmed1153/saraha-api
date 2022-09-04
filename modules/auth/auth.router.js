const { validation } = require("../../middleware/validation");
const { signUpValidator, loginValidator } = require("./auth.validation");
const { login } = require("./controller/signin");
const { signup } = require("./controller/signup");

const router = require("express").Router();

router.post("/signup", validation(signUpValidator), signup);

router.post("/signin", validation(loginValidator), login);

module.exports = router;
