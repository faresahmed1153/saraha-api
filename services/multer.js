const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs");

const validateFileMthod = {
  image: ["image/jpg", "image/jpeg", "image/png"],
};
function myMulter(customPath, validateType) {
  const fullPath = path.join(__dirname, `../uploads/${customPath}`);
 
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.destinationFile = `uploads/${customPath}`;
      cb(null, fullPath);
    },
    filename: function (req, file, cb) {
      console.log(file);
      const fullFileName = nanoid() + "_" + file.originalname;
      cb(null, fullFileName);
    },
  });
  const fileFilter = function (req, file, cb) {
    if (validateType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidation = true;
      cb(null, false);
    }
  };
  const upload = multer({ det: fullPath, fileFilter, storage });
  return upload;
}

module.exports = { myMulter, validateFileMthod };
