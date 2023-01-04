const User = require('../user'); 
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',iamironman
    password: '',
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
  },
];
const db = require('../../config/mongoose');
db.once('open', () => {
  console.log('mongodb connected!');
  users.forEach((e) => {
    User.create({ name: e.firstName, email: e.email, password: e.password });
  });

  console.log('done');
});
