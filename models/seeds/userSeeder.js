const User = require('../user');
const Todo = require('../todo'); // 載入 todo model
const bcrypt = require('bcryptjs');

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
};
// const users = [
//   {
//     firstName: 'Tony',
//     email: 'tony@stark.com',
//     password: 'iamironman',
//   },
//   {
//     firstName: 'Steve',
//     email: 'captain@hotmail.com',
//     password: 'icandothisallday',
//   },
//   {
//     firstName: 'Peter',
//     email: 'peter@parker.com',
//     password: 'enajyram',
//   },
//   {
//     firstName: 'Natasha',
//     email: 'natasha@gamil.com',
//     password: '*parol#@$!',
//   },
//   {
//     firstName: 'Nick',
//     email: 'nick@shield.com',
//     password: 'password',
//   },
// ];
const db = require('../../config/mongoose');
db.once('open', () => {
  console.log('mongodb connected!');
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    ).then((user) => {
    const userId = user._id;
    return Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        Todo.create({ name: `name-${i}`, userId })
      )
    );
  }).then(() => {
    console.log('done.');
    process.exit();
  });
});
