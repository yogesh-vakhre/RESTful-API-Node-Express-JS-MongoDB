const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },    
    email: { type: String, unique: true },
    password: { type: String },
    published: Boolean,
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
