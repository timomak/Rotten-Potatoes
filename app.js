var express = require('express')
var methodOverride = require('method-override')
var app = express()
var mongoose = require('mongoose');
var Comment = require('./models/comment.js')
var Review = require('./models/review.js')
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
app.get('/', (req, res) => {
  Review.find().then((reviews) => {
    res.render('reviews-index', {reviews: reviews});
  }).catch((err) => {
    console.log(err);
  })
})
app.get('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect('/reviews/' + review._id)
  }).catch((err) => {
    console.log(err.message)
  })
})
app.post('/reviews/comment', (req, res) => {
  Comment.create(req.body).then((comment) => {
    res.redirect('/reviews/' + comment.reviewId)
  }).catch((err) => {
    console.log(err.message)
  })
})
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})
app.get('/reviews/:id', (req, res) => {
  const findReviews = Review.findById(req.params.id)
  const findComments = Comment.find({ reviewId: Object(req.params.id) })

  Promise.all([findReviews, findComments]).then((values) => {
    console.log(values)
    res.render('reviews-show', { review: values[0], comments: values[1] })
  }).catch((err) => {
    console.log(err.message)
  })
})
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
    res.redirect('/reviews/'+ review._id)
  }).catch((err) => {
    console.log(err.message);
  })
})
app.delete('/reviews/:id', function(req,res){
  console.log("Delete Review")
  Review.findByIdAndRemove(req.params.id).then((review) =>{
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(process.env.PORT ||3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
