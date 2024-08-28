const mongoose = require('mongoose');

const videoProgressSchema = mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Page' },
  watchedDuration: { type: Number, required: true },
});

const moduleProgressSchema = mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Module' },
  videos: [videoProgressSchema],
});

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: [moduleProgressSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
