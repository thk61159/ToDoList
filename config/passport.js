const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//module.exports，直接匯出一個 function
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'this email has not been registered',
            });
          }
          if (user.password !== password) {
            return done(null, false, {
              message: 'Email or Password incorrect.',
            });
          }
          return done(null, user); //如果沒遇到錯誤則將user傳下去
        })
        .catch((err) => done(err, false));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
