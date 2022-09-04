const nodeoutlook = require("nodejs-nodemailer-outlook");
const path = require("path");

const fullPath = path.join(__dirname, `/download.png`);
async function sendEmail(dest, message) {
  try {
    nodeoutlook.sendEmail({
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
      from: process.env.email,
      to: dest,
      subject: "Reset Password",
      html: message,
      text: "This is text version!",

      onError: (e) => {
        console.log(e);
        if (e.responseCode == 535) {
          console.log("wow");
          return false;
        }
      },
      onSuccess: (i) => console.log(i),
    });
  } catch (error) {
    console.log("hmmmm");
  }
}

module.exports = { sendEmail };
