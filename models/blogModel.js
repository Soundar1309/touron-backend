const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  heading: { type: String },
  image: { type: String },
  content: { type: String },
});

const blogSchema = new mongoose.Schema(
  {
    countryName: String,
    stateName: String,
    cities: [String],
    keywords: [String],
    title: String,
    tourType: String,
    image: String,
    content: String,
    sections: {
      type: [sectionSchema],
    },
    categories: [String],
    comments: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
