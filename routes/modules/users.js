const express = require('express');
const router = express.Router();
const User = require('../../models/user');
// const session = require('express-session');
const passport = require('passport');
// router.use(
//   session({
//     secret: '這是在幫session簽名',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

router.get('/login', (req, res) => {
  const { note } = req.query;
  res.locals.hiddenLogoutBtn = true;
  res.render('login', { note });
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
);

router.get('/register', (req, res) => {
  res.locals.hiddenLogoutBtn = true
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, comfirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      console.log(user)
      if (user) {
        let note = '此email已經註冊過了！';
        console.log('User already exists.');
        res.render('register', { name, email, password,comfirmPassword, note });
      } else {
        // note = '註冊成功'
        return User.create({
          name,
          email,
          password,
        })
          // .then(() => res.render('register',{note}))
          .then(() => res.redirect('/'))
          .catch((e) => console.log(e));
      }
    })
    
    .catch((e) => console.log(e));
});

router.get('/logout', (req, res) => {
  const note = '已登出';
  req.logout();
  // req.session.isVerified = false;
  res.redirect(`./?note=${note}`);
});
module.exports = router;
