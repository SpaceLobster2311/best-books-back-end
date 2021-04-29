const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookSchema = new Schema({
  bookName: {type: String},
  bookDescription: {type: String},
  bookStatus: {type: Boolean}
});

const userSchema = new Schema({
  userName: {type: String},
  favoriteBooks: [bookSchema],
  userEmail: {type: String}
});
// by default mongoose will give us an id property


// make a model from the schema
// const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
module.exports = {User};


