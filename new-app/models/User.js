import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  phone_no: {
    type: Number
  },
  noOfBooks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", UserSchema);