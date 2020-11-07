const express = require('express');
const router = express.Router();

// Controller Modules
const controllers = require('./../controllers/controllers');
const blog_controller = require('../controllers/BlogController')
const comment_controller = require('../controllers/CommentController');

router.get('/say-something', controllers.saySomething);

// create Blog GET
router.get('/blog/create', blog_controller.blog_create_get);

// Create Blog POST

// Delete Blog GET

// Delete Blog POST

// Update Blog GET

// Update Blog POST

// List of Blogs
router.get('/blogs', blog_controller.blog_index);

// Individual Blog
router.get('/blog/:id', blog_controller.blogs);

// create Comment GET

// Create Comment POST

// Delete Comment GET

// Delete Comment POST

// List of Comments

// Individual Comment


module.exports = router;