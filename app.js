var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {useMongoClient: true});
const bodyParser = require('body-parser');

app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
const reviews = require('./controllers/reviews')(app);

app.listen(27017, () => {
  console.log('App listening on port 27017!')
})

// For Chai
module.exports = app;
