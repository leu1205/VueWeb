const mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    username: String,
    password: String
});

var users = mongoose.model('User', Userschema);

module.exports = users;