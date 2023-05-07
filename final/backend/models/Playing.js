const mongoose = require("mongoose");
const { Schema } = mongoose;

const playingSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  send_notification: [
    {
      friend_id: { type: String, required: true },
      name: { type: String, required: true },
      message: { type: String, required: true },
      playing_date: { type: String, required: true },
      date: { type: Number, default: Date.parse(new Date()) / 1000 },
    },
  ],
  recieve_notification: [
    {
      friend_id: { type: String, required: true },
      name: { type: String, required: true },
      message: { type: String, required: true },
      playing_date: { type: String, required: true },
      date: { type: Number, default: Date.parse(new Date()) / 1000 },
    },
  ],
  accepted_send_notification: [
    {
      friend_id: { type: String, required: true },
      name: { type: String, required: true },
      message: { type: String, required: true },
      playing_date: { type: String, required: true },
      date: { type: Number, default: Date.parse(new Date()) / 1000 },
    },
  ],
  accepted_recieve_notification: [
    {
      friend_id: { type: String, required: true },
      name: { type: String, required: true },
      message: { type: String, required: true },
      playing_date: { type: String, required: true },
      date: { type: Number, default: Date.parse(new Date()) / 1000 },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
const Playing = mongoose.model("playing", playingSchema);
module.exports = Playing;
