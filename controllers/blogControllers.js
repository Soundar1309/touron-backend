const Blog = require("../models/blogModel");

// @desc    get all blogs
// @route   GET /api/blogs/getblogs
// @access  public

const getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const blogs = await Blog.find({}).select({ countryName: 1, stateName: 1, title: 1, keywords: 1, content: 1, image: 1, tourType: 1 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Blog.countDocuments({});

  res.json({
    totalRecords,
    page,
    limit,
    blogs,
  });
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
    stateName,
    cities,
    keywords,
    title,
    image,
    content,
    sections,
    categories,
    comments,
    tourType,
  } = req.body;

  const blog = await Blog.create({
    countryName,
    stateName,
    cities,
    keywords,
    title,
    image,
    content,
    sections,
    categories,
    comments,
    tourType,
  });
  await blog.save();
  res.status(201).json(blog);
};

// @desc    update blog
// @route   POST /api/blogs/updateblog/:id
// @access  private
const updateBlog = async (req, res) => {
  try {
    const {
      countryName,
      stateName,
      cities,
      keywords,
      title,
      image,
      content,
      sections,
      categories,
      comments,
      tourType,
    } = req.body;
    const blog = await Blog.findById(req.params.id);
    blog.countryName = countryName;
    blog.stateName = stateName;
    blog.cityName = cities;
    blog.keywords = keywords;
    blog.title = title;
    blog.image = image;
    blog.content = content;
    blog.sections = sections;
    blog.categories = categories;
    blog.comments = comments;
    blog.tourType = tourType;
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
  deleteBlog,
};
