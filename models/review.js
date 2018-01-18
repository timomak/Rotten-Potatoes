var mongoose = require('mongoose')

var Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review
