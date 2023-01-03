const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');
const passport = require('passport');

// const checkedUser = (req, res, next) => {
//   if (!req.session.isVerified) {
//     const note = 'please login first';
//     res.redirect(`http://localhost:3000/users`);
//   } else {
//     next();
//   }
// };
let middelware = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users',
});
// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});

module.exports = router;