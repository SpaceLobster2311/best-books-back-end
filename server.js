const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const { schema } = require('./models/schema');
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });



// intentionally requiring this model AFTER i run mongoose.connect

const { User, Book } = require('./models/schema');

// seed the database with some books so I can retrieve them


const PORT = process.env.PORT || 3001;


// const myBook = new Book({bookName: '1984', bookDescription: 'scary', bookStatus: true});

const myUser = new User({
  userName: 'Michael',
  favoriteBooks: [{ bookName: 'Antarctica 2041' }, { bookName: 'Where the wild things are' }, { bookName: 'War and Peace' }],
  userEmail: 'michael3hendricks@gmail.com',
});

// duplicate mybook with myuser

// myBook.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('book works');
//   }
// });

myUser.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('user saved');
  }
});



app.get('/', (req, res) => {
  res.send('hello bro');
});



app.get('/book', (req, res) => {
  let user = req.query.user;
  console.log(user);
  // get all books from db
  // send them in response
  User.find( {userEmail: user}, (err, databaseResults) => {
    // send them in my response to front end
    res.send(databaseResults[0]);
  });
});


// route to get 1 user from db
// app.get('/user', (req,res)=> {

//   User.find((err, databaseResults)=> {
//     console.log(myUser);
//     res.send(databaseResults);
//   });
// });

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

