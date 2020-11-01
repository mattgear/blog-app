const mongoose = require('mongoose');
const Schema = mogoose.Schema;

const BlogSchema = new Schema ({
    name: {type: String, required: true, max:100},
    author: {type: Schema.Types.UserId, ref: 'User', required: true},
    created: {type: Date, required: true},
    updated: {type: Date, required: true},
    content: {type: Blob, required: true}
})

// Virtual for blog url
BlogSchema
    .virtual('url')
    .get(() => {
        '/blog/' + this._id
    })

module.exports = mongoose.model('Blog', BlogSchema);