const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, maxLength: 255},
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema)
