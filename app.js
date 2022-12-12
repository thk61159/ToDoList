const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
app.engine('handlebars', engine());
app.set('view engine','handlebars' )
app.set('views','./views')


app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(3000, () => {
  console.log(`app is http://localhost:${port}`);
})