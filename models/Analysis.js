const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  website: String,
  industry: String,
  score: Number,
  mentions: [String],
  competitors: [String],
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
