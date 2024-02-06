const Blog = require("../models/blogModel");

// @desc    get all blogs
// @route   GET /api/blogs/getblogs
// @access  public
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

// @desc    get limited blogs
// @route   GET /api/blogs/getblogs/:id
// @access  public
const getBlogsByLimit = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(10);
  res.json(blogs);
};

// @desc    get all blogs in ascending order
// @route   GET /api/blogs/getblogs
// @access  public
const getBlogsInAscending = async (req, res) => {
  const allblogs = await Blog.find({}).sort({ createdAt: -1 });
  res.json(allblogs);
};

// @desc    get blog by id
// @route   GET /api/blogs/:id
// @access  public
const getBlogbyID = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
};

// @desc    add blog
// @route   POST /api/blogs/addblog
// @access  private
const addBlog = async (req, res) => {
  const {
    countryName,
    cityName,
    keywords,
    blogTitle,
    imageSrc,
    content,
    subHeading1,
    imageSrc1,
    content1,
    subHeading2,
    imageSrc2,
    content2,
    subHeading3,
    imageSrc3,
    content3,
    categories,
    comments
  } = req.body;

  const blog = await Blog.create({
    countryName,
    cityName,
    keywords,
    blogTitle,
    imageSrc,
    content,
    subHeading1,
    imageSrc1,
    content1,
    subHeading2,
    imageSrc2,
    content2,
    subHeading3,
    imageSrc3,
    content3,
    categories,
    comments
  });
  await blog.save()
  res.status(201).json(blog);
};

// @desc    update blog
// @route   POST /api/blogs/updateblog/:id
// @access  private
const updateBlog = async (req, res) => {
  try {
    const {
      countryName,
      cityName,
      keywords,
      blogTitle,
      imageSrc,
      content,
      subHeading1,
      imageSrc1,
      content1,
      subHeading2,
      imageSrc2,
      content2,
      subHeading3,
      imageSrc3,
      content3,
      categories,
      comments
    } = req.body;
    const blog = await Blog.findById(req.params.id);
      blog.countryName =countryName,
      blog.cityName = cityName
      blog.keywords = keywords
      blog.blogTitle = blogTitle
      blog.imageSrc = imageSrc
      blog.content = content
      blog.subHeading1 = subHeading1
      blog.imageSrc1 = imageSrc1
      blog.content1 = content1
      blog.subHeading2 = subHeading2
      blog.imageSrc2 = imageSrc2
      blog.content2 = content2
      blog.subHeading3 = subHeading3
      blog.imageSrc3 = imageSrc3
      blog.content3 = content3
      blog.categories = categories
      blog.comments = comments
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// @desc    add comment to blog
// @route   POST /api/blogs/updatecomment/:id
// @access  private
const updateComment = async (req, res) => {
  try {
    const { newComment } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Add the new comment to the existing comments array
    blog.comments.push(newComment);

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete blog
// @route   POST /api/blogs/deleteblog
// @access  private
const deleteBlog = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlogsByLimit,
  getBlogsInAscending,
  getBlogbyID,
  addBlog,
  updateComment,
  updateBlog,
  deleteBlog
};
