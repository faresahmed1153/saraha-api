const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "uploads/users/profilePic/Default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bycrpt.hash(this.password, parseInt(process.env.saltRound));
  next();
});

userSchema.pre("findOneAndUpdate", async function () {
  // console.log(this.model);
  // console.log(this.getQuery());
  const hookData = await this.model.findOne(this.getQuery()).select("__v");
  console.log(hookData);
  this.set({ __v: hookData.__v + 1 });
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
