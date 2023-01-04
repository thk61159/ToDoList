const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');
const passport = require('passport');

// 定義首頁路由
router.get('/', (req, res) => {
  res.locals.controller = '/todos/new';
  res.locals.sign = 'create';
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});

module.exports = router;