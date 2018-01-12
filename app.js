const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });


const Review = mongoose.model('Review', {
  title: String
});

app.get('/', (req, res) => {
  Review.find().then((reviews) => {
    res.render('reviews-index', {reviews: reviews});
  }).catch((err) => {
    console.log(err);
  })
})
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

// INDEX
app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
