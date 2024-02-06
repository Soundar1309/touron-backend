const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogsByLimit,
  getBlogbyID,
  getBlogsInAscending,
  addBlog,
  updateBlog,
  deleteBlog,
  updateComment,
} = require("../controllers/blogControllers");

router.get("/getblogs", getBlogs);
router.get("/getblogs/:id", getBlogsByLimit);
router.get("/getblogs/ascending", getBlogsInAscending);
router.get("/:id", getBlogbyID);
router.post("/addblog", addBlog);
router.post("/updateblog/:id", updateBlog);
router.post("/updatecomment/:id", updateComment)
router.post("/deleteblog", deleteBlog);

module.exports = router;
