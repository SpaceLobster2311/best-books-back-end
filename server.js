const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const { schema } = require('./models/schema');


mongoose.connect('mongodb://localhost:27017/bookAPI', {useNewUrlParser: true, useUnifiedTopology: true});



// intentionally requiring this model AFTER i run mongoose.connect

const {User, Book} = require('./models/schema');

// seed the database with some books so I can retrieve them





const myBook = new Book({bookName: '1984', bookDescription: 'scary', bookStatus: true});

const myUser = new User ({
  userName: 'Alex',
  favoriteBooks: [{ bookName: 'The River Why'}, {bookName: 'Connections to Third World Facsim'}, {bookName: 'Moby Dick'}],
  userEmail: 'alex.williams2311@gmail.com',
});

// duplicate mybook with myuser

myBook.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('book works');
  }
});

myUser.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('user works');
  }
});



app.get('/',(req,res)=> {
  res.send('hello bro');
});



app.get('/book',(req,res)=> {

  // get all books from db
  // send them in response
  Book.find((err, databaseResults) => {
    // send them in my response to front end
    res.send(databaseResults);
  });
});


// route to get 1 user from db
app.get('/user', (req,res)=> {

  User.find((err, databaseResults)=> {
    console.log(myUser);
    res.send(databaseResults);
  });
});

app.listen(3001, () => console.log('app is listening on 3001'));

