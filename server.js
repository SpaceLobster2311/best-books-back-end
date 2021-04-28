const express = require('express')
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/bookAPI', {useNewUrlParser: true, useUnifiedTopology: true});



// intentionally requiring this model AFTER i run mongoose.connect

const Book = require('./models/Book');

// seed the database with some books so I can retrieve them





const myBook = new Book({name: 'hello', color: 'brown',});




myBook.save(function(err) {
  if (err) console.log(err);
  else console.log('book works')
})

app.get('/',(req,res)=> {
  res.send('hello bro')
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
app.get('/Book', (res,req)=> {
  User.find(name: )
})

app.listen(3001, () => console.log('app is listening on 3001'));

