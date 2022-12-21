const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
//template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
// 加入這段 code, 僅在非正式環境時, 引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數。
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
//database
const mongoose = require('mongoose'); // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // 設定連線到 mongoDB connect to 環境變數
// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on('error', () => {
  console.log('mongodb error!');
});
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!');
});
app.use(methodOverride('_method'));
const Todo = require('./models/todo');
///////////////////////////////////////
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => {
      return res.render('index', { todos });
    })
    .catch((error) => console.error(error));
});
app.get('/todos/new', (req, res) => {
  res.render('new');
});
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
app.post('/todos', (req, res) => {
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
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  // const name = req.body.name;
  //解構賦值
  const { name, isDone } = req.body;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone ==='on'
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.error(error));
});
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});
app.listen(3000, () => {
  console.log(`app is http://localhost:${port}`);
});
