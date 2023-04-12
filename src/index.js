const express = require("express");
const morgan = require('morgan');
const router = express.Router();
const {engine} = require('express-handlebars')
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use((req, res, next) => {

  next();
})


app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/users', require('./routes/users'));




app.listen(app.get('port'), () => {
  console.log("App listening on port", app.get('port'));
});

/*
router.get('/', function(req, res, next){
  res.render('main/main.html', { title: 'Express'});
});
*/
module.exports = app;