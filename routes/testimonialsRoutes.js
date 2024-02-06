const express = require("express")
const router = express.Router()
const { getTestimonials, getTestimonialsById, addTestimonials, updateTestimonials, deleteTestimonials } = require("../controllers/testimonialsControllers")

router.get("/", getTestimonials)
router.get("/:id", getTestimonialsById)
router.post("/add", addTestimonials)
router.post("/update/:id", updateTestimonials)
router.post("/delete", deleteTestimonials)

module.exports = router