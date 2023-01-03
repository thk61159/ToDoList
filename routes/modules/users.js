const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.use(express.static('public'));

router.get('/', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res) => {
  console.log(req.body);

  res.send('寫入資料中');
});

router.get('/register', (req, res) => {
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
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/'))
          .catch((e) => console.log(e));
      }
    })
    
    .catch((e) => console.log(e));
});

module.exports = router;
