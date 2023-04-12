const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your First name"]
    },
    lastName: {
      type: String,
      required: [true, "Please tell us your  Last name"]
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"]
    },
    role: {
      type: String,
      enum: ["viewer", "editor", "admin"],
      default: "viewer"
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false
    },
    confirmPassword: {
      type: String,
      // required: [true, "Please provide a confirm password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Paassword are not the same"
      }
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide your date of birth"]
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    phoneNo: {
      type: String,
      required: [true, "Please provide your phone number"]
    },
    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
        "Suspended",
        "Deleted",
        "Blocked",
        "Pending"
      ],
      default: "Pending"
    },
    hasAcceptedTerms: {
      type: Boolean,
      default: false
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerifyToken: String,
    emailVerifyTokenExpires: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);
