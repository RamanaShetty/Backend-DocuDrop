const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username Required"],
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Password Required"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Client", clientSchema);
