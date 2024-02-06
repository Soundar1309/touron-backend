const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    countryName: String,
    cityName: [String],
    keywords: [String],
    blogTitle: String,
    imageSrc: String,
    content: String,
    subHeading1: String,
    imageSrc1: String,
    content1: String,
    subHeading2: String,
    imageSrc2: String,
    content2: String,
    subHeading3: String,
    imageSrc3: String,
    content3: String,
    categories: [String],
    comments: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
