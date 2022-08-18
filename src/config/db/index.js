const mongoose = require('mongoose');
function connect(){
    mongoose.connect('mongodb://localhost:27017/app_nghe_nhac', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected MongoDB!');
    }).catch(() => {
        console.log('Failed connect MongoDB!');
    });
}

module.exports = {connect}
