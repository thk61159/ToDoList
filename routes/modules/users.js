const express = require('express');
const router = express.Router();

const Todo = require('../../models/todo');


router.get('/', (req, res) => {
  res.send('login page')
})








module.exports = router;