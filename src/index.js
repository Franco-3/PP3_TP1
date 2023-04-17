const express = require("express");
const morgan = require('morgan');
const router = express.Router();
const {engine} = require('express-handlebars')
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore =require('express-mysql-session')(session);
const passport = require('passport');

const connection = {
  host : 'localhost',
  database : 'pp3tp1bd',
  user : 'root1',
  password : '123root123'
};

const app = express();
require('./lib/passport');


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


app.use(session({
  secret: 'mysqlsession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(connection)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
})


app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
  console.log("App listening on port", app.get('port'));
});


module.exports = app;