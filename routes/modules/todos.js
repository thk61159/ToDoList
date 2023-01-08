const router = require('express').Router();
const Todo = require('../../models/todo');

router.get('/new', (req, res) => {
  res.locals.controller = '/';
  res.locals.sign = 'back';
  res.render('new');
});
router.get('/:id', (req, res) => {
  res.locals.controller = '/';
  res.locals.sign = 'back';
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});
router.get('/:id/edit', (req, res) => {
  res.locals.controller = '/';
  res.locals.sign = 'back';
  const userId = req.user._id;
  const id = req.params.id;
  return Todo.findOne({ _id: id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
router.post('/', (req, res) => {
  const userId = req.user._id;
  const name = req.body.name;
  const todo = new Todo({ name, userId });
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
router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  // const name = req.body.name;
  //解構賦值
  const { name, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});
module.exports = router;
