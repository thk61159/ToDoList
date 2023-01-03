const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

const checkedUser = (req, res, next) => {
  if (!req.session.isVerified) {
    const note = 'please login first';
    res.redirect(`http://localhost:3000/users`);
  } else {
    next();
  }
};
// 定義首頁路由
router.get('/', checkedUser, (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});
router.get('/error', (req, res) => {
  res.send('你答錯了')
});
module.exports = router;