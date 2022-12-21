const express = require('express');
const router = express.Router();



const Todo = require('../../models/todo');
// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});
module.exports = router;