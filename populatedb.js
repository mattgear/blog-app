// This script populates test objects to mongodb
// Specified database as argument - e.g.: node populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true

const userArgs = process.argv.slice(2);

const async = require("async"),
    Blog = require("./models/blog"),
    User = require("./models/user"),
    Comment = require("./models/comment");

const mongoose = require("mongoose");
const mongodb = userArgs[0];
mongoose.connect(mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

let blogs = [];
let users = [];
let comments = [];

function blogCreate (name, author, created, updated, content, published, cb) {
    blogdetail = {
        name,
        author,
        created,
        updated,
        content,
        published
    };

    let blog = new Blog(blogdetail);

    blog.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New blog: ' + blog);
        blogs.push(blog);
        cb(null, blog);
    });
}

function userCreate (name, email, password, cb) {
    userDetail = {
        name,
        email,
        password
    };

    let user = new User(userDetail);

    user.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New user: ' + user);
        users.push(user);
        cb(null, user);
    });
}

function commentCreate (blog, name, text, created, cb) {
    commentDetail = {
        blog,
        name,
        text,
        created
    };

    let comment = new Comment(commentDetail);

    comment.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New comment: ' + comment);;
        comments.push(comment);
        cb(null, comment);
    });
}

function createBlogs(cb) {
    async.parallel([
        function(callback) {
            blogCreate("Test Blog", users[0], "2020-01-10", "", "This is a new blog post", true, callback)
        },
        function(callback) {
            blogCreate("Test Blog 2", users[0], "2020-01-10", "", "This my second blog post", true, callback)
        },
        function(callback) {
            blogCreate("Unpublished Blog", users[0], "2020-01-10", "2020-05-10", "This is an unpublished blog post", false, callback)
        }
    ],
    cb
    );
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
            userCreate("Matt", "matt@mail.com", "TestPass1.", callback)
        },
        function(callback) {
            userCreate("Commentor", "commentor@gmail.com", "commentor1.", callback)
        },
        function(callback) {
            userCreate("Troll", "troll@gmail.com", "trollpass1.", callback)
        }
    ],
    cb);
}

function createComments(cb) {
    async.parallel([
        function(callback) {
            commentCreate(blogs[0], users[0], "Great post!", "2020-12-13", callback)
        },
        function(callback) {
            commentCreate(blogs[0], users[1], "Cool", "2020-12-01", callback)
        },
        function(callback) {
            commentCreate(blogs[0], users[2], "You suck..", "2020-11-13", callback)
        },
        function(callback) {
            commentCreate(blogs[1], users[0], "Great post!", "2020-12-13", callback)
        },
    ],
    cb);
}

async.series([
    createUsers,
    createBlogs,
    createComments
],
function (err, results) {
    if (err) {
        console.log("FINAL ERR: " + err);
    } else {
        console.log("Created: " + results)
    }
    mongoose.connection.close();
})