const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, maxLength: 255},
    password: { type: String, maxLength: 255},
    email: { type: String, maxLength: 255},    
    status: { type: String, maxLength: 255},    
    createdAt: { type: Date, default: Date.now },
    token: { type: String, maxLength: 255}
});

module.exports = mongoose.model('User', UserSchema)
