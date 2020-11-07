const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema ({
    name: {type: String, required: true, max:100},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    created: {type: Date, required: true},
    updated: {type: Date},
    content: {type: String, required: true},
    published: {type: Boolean, required: true}
})

// Virtual for blog url
BlogSchema
    .virtual('url')
    .get(() => {
        '/blog/' + this._id
    })

module.exports = mongoose.model('Blog', BlogSchema);