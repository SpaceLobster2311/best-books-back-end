const mongoose = require('mongoose');
const { Schema } = mongoose;




const bookSchema = new Schema({
  name: String,
  color: String,
});

const userSchema = new Schema({
  userName: String,
  favoriteBooks: [bookSchema],
})
// by default mongoose will give us an id property


// make a model form the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;