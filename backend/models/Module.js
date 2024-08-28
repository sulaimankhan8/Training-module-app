const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const moduleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    pages: [pageSchema],
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
