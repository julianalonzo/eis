const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, required: true, enum: ["thumbnail", "attachment"] },
  size: { type: Number, required: true },
  dateUploaded: { type: Date, required: true, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("File", fileSchema);
