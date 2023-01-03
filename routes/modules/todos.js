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

router.get('/new',checkedUser, (req, res) => {
  res.render('new');
});
router.get('/:id',checkedUser, (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});
router.get('/:id/edit',checkedUser, (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
router.post('/',checkedUser, (req, res) => {
  const name = req.body.name;
  const todo = new Todo({ name });
  console.log(req.body);
  return todo
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
  //另一種寫法
  // return Todo.creat({ name })
  //   .then(() => res.redirect('/'))
  //   .catch((error) => console.error(error));
});
router.put('/:id',checkedUser, (req, res) => {
  const id = req.params.id;
  // const name = req.body.name;
  //解構賦值
  const { name, isDone } = req.body;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.error(error));
});
router.delete('/:id',checkedUser, (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});
module.exports = router;
