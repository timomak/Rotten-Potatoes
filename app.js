var express = require('express')
var methodOverride = require('method-override')
var app = express()
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useMongoClient: true });
mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
var bodyParser = require('body-parser');
var Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String
});

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

// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

// INDEX
app.get('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect('/reviews/' + review._id)
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
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
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
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
