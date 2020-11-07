const blog = require("../models/blog")

const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of Blogs
exports.blog_index = function(req, res) {
    Blog.find()
        .populate((err, list_blogs) => {
            if (err) { return next(err) };
            res.render('blog_list', { title: 'List of Blogs', blog_list: list_blogs})
        });
};

// Display individual blogs
exports.blogs = function(req, res, next) {
    async.parallel({
        blog: function(callback) {
            Blog.findById(req.params.id).exec(callback);
        },
        blog_user: function(callback) {
            User.find({ 'blog': req.params.id }).exec(callback);
        },
        blog_comments: function(callback) {
            Comment.find({ 'blog': req.params.id }).exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err) };
        if (results.blog === null) {
            let err = new Error('Blog not found');
            err.status = 404;
            return next(err);
        }
        res.render('blog_detail', { title: 'Blog Detail', blog: results.blog, blog_user: results.blog_user, blog_comments: results.blog_comments });
    });
};

// Display create form
exports.blog_create_get = function(req, res, next) {
    res.render('blog_create', { title: 'Create New Blog'});
};

// Handle Post on Create form

// Handle Get on Delete

// Handle Post on Delete

// Handle Get on Update

// Handle Post on Update
