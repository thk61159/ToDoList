///////////////////////impot////////////////////////
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const routes = require('./routes');
require('./config/mongoose');

///////////////////////setting////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');//使用時省略寫副檔名
app.set('views', './views');
app.use(methodOverride('_method'));
///////////////////////controller////////////////////////

app.use(routes);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
