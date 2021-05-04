const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const { schema } = require('./models/schema');
const cors = require('cors');
app.use(cors());
app.use(express.json());

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
  User.find({ userEmail: user }, (err, databaseResults) => {
    // send them in my response to front end
    res.send(databaseResults[0]);
  });
});

app.post('/book', (req, res) => {
  let user = req.query.user;
  // uses app.json above
  console.log(req.query.user);
  //find user in database
  User.find({ userEmail: user }, (err, userData) => {
    if (userData.length < 1) {
      res.send(400).send('user does not exist');
    } else {//add book info to user
      console.log(req.query.user);
      userData[0].favoriteBooks.push({
        bookName: req.body.bookName,
        bookDescription: req.body.description,
      });
      //save user
      userData[0].save().then(() => {
        res.send('user saved');
      });
    }
  });


});
// route to get 1 user from db
// app.get('/user', (req,res)=> {

//   User.find((err, databaseResults)=> {
//     console.log(myUser);
//     res.send(databaseResults);
//   });
// });
app.delete('/books/:id', (req, res) => {
  let email = req.query.user;
  User.find({ email: email }, (err, userData) => {
    let user = userData[0];
    user.books = user.books.filter(book => `${book._id}` !== req.paramm.id);
    //save user
    user.save().then(userData => {
      res.send(userData.gifts);
    });
  });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

