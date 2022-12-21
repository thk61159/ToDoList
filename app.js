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
///////////////////////////////////////

const routes = require('./routes')
app.use(routes);


app.listen(3000, () => {
  console.log(`app is http://localhost:${port}`);
});
