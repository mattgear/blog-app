const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    blog: {type: Schema.Types.ObjectId, ref: 'Blog', required: true},
    name: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true, max: 150},
    created: {type: Date, required: true}
})

// SORT RETURN
// Virtual for Comments
CommentSchema 
    .virtual('url')
    .get(function() {
        return '/blog/' + this._id + '/comments'
    });

module.exports = mongoose.model('Comment', CommentSchema);