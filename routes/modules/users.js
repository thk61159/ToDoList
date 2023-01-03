const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const session = require('express-session');
router.use(
  session({
    secret: '這是在幫session簽名',
    resave: false,
    saveUninitialized: false,
  })
);

router.get('/', (req, res) => {
  const { note } = req.query
  const hiddenLogoutBtn = true;
  res.render('login', { note, hiddenLogoutBtn });
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((e) => {
      if (e) {
        req.session.isVerified = true;
        res.redirect(`../`);
      } else {
        const note = 'wrong mail address or password!!';
        res.redirect(`./?note=${note}`);
      }
    })
    .catch((e) => console.log(e));
});

router.get('/register', (req, res) => {
  const hiddenLogoutBtn = true;
  res.render('register', { hiddenLogoutBtn });
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
  req.session.isVerified = false;
  res.redirect(`./?note=${note}`);
});
module.exports = router;
