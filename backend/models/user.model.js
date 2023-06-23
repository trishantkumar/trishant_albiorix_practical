const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile:  {
        type: String
    },
    dob:  {
        type: String
    },
}, {
    timestamps: true
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)