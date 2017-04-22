import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from './config';
import User from './models/user';
import routers from './routers/';

/**
 * setting up db
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db);

const app = express();

/**
* static files
*/
app.use(express.static(path.resolve(__dirname, './public')));

/**
 * logger
 */
app.use(morgan('short'));

/**
 * request parser
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));

/**
 * cookie parser
 */
app.use(cookieParser());

/**
 * session
 */
const MongoStore = connectMongo(session);
app.use(session({
  secret: 'respectprivacy',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));


/**
 * passport
 */
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username, password}).then(user => {
    user ? done(null, user) : done(null, false);
  }, () => { done(null, false); });
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  User.findOne({ username }).then(user => {
    done(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

/**
 * nunjucks
 */
nunjucks.configure(path.resolve(__dirname, './views'), {
  express: app
});


/**
 * default assets path
 */
const baseURL = process.env.NODE_ENV === 'production'
? config.prodServer
: config.devServer;

const defaultLocals = {
  css: [baseURL + '/css/site.css'],
  js: [baseURL + '/js/site.js'],
  base: baseURL,
  title: config.title
};

app.use((req, res, next) => {
  res.locals = defaultLocals;

  next();
});

/**
 * routers
 */


/**
 * start server
 */
if (process.env.NODE_ENV !== 'production') {
  app.listen(config.devPort, () => {
    console.log(`server has been started on port: ${config.devPort}`);
  });
} else {
  app.listen(config.prodPort, () => {
    console.log(`server has been started on port: ${config.prodPort}`);
  });
}
