///////////////////////impot////////////////////////
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const routes = require('./routes');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./config/mongoose');

///////////////////////setting////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', './views');
// 在非正式環境時, 引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數。

app.use(methodOverride('_method'));
///////////////////////controller////////////////////////

app.use(routes);

app.listen(PORT, () => {
  console.log(`app is http://localhost:${PORT}`);
});
