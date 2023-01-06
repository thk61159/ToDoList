const express = require('express');
const router = express.Router();
const User = require('../../models/user');
// const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
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
  res.locals.hiddenLogoutBtn = true;
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' });
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  User.findOne({ email })
    .then((user) => {
      console.log(user);
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' });
        let note = '此email已經註冊過了！';
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
          note,
        });
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )
          .then(() => res.redirect('/'))
          .catch((e) => console.log(e));
      }
    })

    .catch((e) => console.log(e));
});

router.get('/logout', (req, res) => {
  const note = '已登出';
  req.flash('success_msg', '你已經成功登出。');
  req.logout();
  // req.session.isVerified = false;
  res.redirect(`/users/login?note=${note}`);
});
module.exports = router;
