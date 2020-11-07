const Blog = require('../models/blog');
const Comment = require('../models/comment');
const User = require('../models/user');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display List of Comments
exports.comment_list = function(req, res, next) {
    Comment.find()
        .populate((err, list_comments) => {
            if (err) { return next(err) };
            res.render('comment_list', { title: 'List of Comments', comment_list: list_comments})
        })
};

// Handle get of create
exports.comment_create_get = function(req, res, next) {
    async.parallel({
        blogs: function(callback) {
            Blog.find(callback)
        },
    }, function(err, results) {
        if (err) { return next(err) };
        res.render('comment_form', { title: 'Add a comment', blogs: results.blogs });
    });
};

// Handle Post of create
exports.comment_create_post = [
    (res, req, next) => {
        if (!(req.body.blog instanceof Array)) {
            if (typeof req.body.blog === 'undefined') {
                req.body.blog = [];
            } else {
                req.body.blog = new Array(req.body.blog);
            }
        }
        next();
    },

    body('text', 'Comment must be added').trim().isLength({min: 3}),

    (req, res, next) => {
        const errors = validationResult(req);

        let comment = new Comment({
            blog: req.body.blog,
            name: req.body.username,
            text: req.body.text,
            created: new Date().toISOString().slice(0, 10)
        });

        if (!errors.isEmpty()) {
            async.parallel({
                comments: function(callback) {
                    Comment.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }
                
                res.render('comment_form', {title: 'Add Comment', comment: req.body, error: errors.array() });
            });
            return;
        } else {
            comment.save(function(err) {
                if (err) { return next(err); }
                res.redirect(comment.url)
            });
        }
    }
];

// Handle delete of comment
exports.comment_delete_post = function(req, res, next) {
    async.parallel({
        comment: function(callback) {
            Comment.findById(req.params.id).exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); }

        Comment.findByIdAndRemove(req.body.commentid, function deleteComment(err) {
            if (err) { return next(err); }

            res.redirect('/blogs/something')
        });
    })
};