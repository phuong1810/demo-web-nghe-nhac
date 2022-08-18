const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    name: { type: String, maxLength: 255},
    thumbnailUrl: { type: String, maxLength: 255},
    singer: { type: String, maxLength: 255},
    category: { type: String, maxLength: 255},
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Music', MusicSchema)
