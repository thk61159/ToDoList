///////////////////////impot////////////////////////
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const routes = require('./routes');
require('./config/mongoose');
const session = require('express-session');
const usePassport = require('./config/passport')// 載入設定檔，要寫在 express-session 以後
const flash = require('connect-flash');

///////////////////////setting////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');//使用時省略寫副檔名
app.set('views', './views');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(
  session({
    secret: '簽名用的字串',
    resave: false,
    saveUninitialized: false,
  })
);
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
///////////////////////controller////////////////////////
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg 訊息
  console.log('success_msg'+res.locals.success_msg);
  res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg 訊息
  console.log('warn'+res.locals.warning_msg);
  next();
})
app.use(routes);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
