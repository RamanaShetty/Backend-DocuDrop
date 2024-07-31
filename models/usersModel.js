const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rollnumber: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    fileIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fs.files",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
