import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
import helmet from 'helmet';

import config from './config.json';
import { User } from './models';
import routers from './routers/';
import replies from './replies';

/**
 * setting up db
 */
 mongoose.Promise = global.Promise;
 mongoose.connect(config.db, {
   useMongoClient: true,
 });

const app = express();

/**
 * Helmet
 */
app.use(helmet());

/**
* static files
*/
app.use('/file', express.static(path.resolve(__dirname, './public')));

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
let MongoStore = connectMongo(session);

app.use(session({
  secret: 'V,X;v|69}[%eDMoWuKQFpY{^"#nkc&',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  store: new MongoStore({
  host: '127.0.0.1',
    port: '27017',
    url: config.db
  })
}));

/**
 * setting up flash
 */
app.use(flash());

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
 * add reply to res
 */

app.use((req, res) => {
  res.reply.ok = replies.ok.bind(res);
  res.reply.notFound = replies.notFound.bind(res);
  res.reply.forbidden = replies.forbidden.bind(res);
  res.reply.error = replies.error.bind(res);
});

/**
 * routers
 */

for (let router in routers) {
  app.use(routers[router]);
}

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
