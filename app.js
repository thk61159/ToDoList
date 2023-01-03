///////////////////////impot////////////////////////
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const routes = require('./routes');
require('./config/mongoose');
const session = require('express-session');

///////////////////////setting////////////////////////
const app = express();
const PORT = process.env.PORT || 3001;
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
///////////////////////controller////////////////////////

app.use(routes);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
