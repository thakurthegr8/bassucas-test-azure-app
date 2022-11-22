const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const UserSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("user", UserSchema);

module.exports = User;
