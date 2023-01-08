///////////////////////impot////////////////////////

const express = require('express')
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const routes = require('./routes');
require('./config/mongoose');
const session = require('express-session');
const usePassport = require('./config/passport')// 載入設定檔，要寫在 express-session 以後
const flash = require('connect-flash');//提示module
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

///////////////////////setting////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs'}));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');//使用時省略寫副檔名
app.set('views', './views');
app.use(methodOverride('_method'));//RESTful API for PUT and DELET
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//  Passport 負責athenticate擺在routes之前
usePassport(app)
///////////////////////middleware////////////////////////
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg 訊息
  next();
})
///////////////////////routes////////////////////////
app.use(routes);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});


