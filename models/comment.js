var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment
