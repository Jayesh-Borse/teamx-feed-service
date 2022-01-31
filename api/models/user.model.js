const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    image: String,
    _id: String,
    email: String,
    isStudentAuthenticated: Boolean,
    accessToken: String,
    bio: String,
    blog: String,
    twitter: String,
    repos: Array,
    skills: Array // {name: String, status: String}
}, {collection: 'users'});

module.exports = mongoose.model('User', UserSchema);