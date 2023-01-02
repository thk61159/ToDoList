const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');


router.get('/', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});






module.exports = router;