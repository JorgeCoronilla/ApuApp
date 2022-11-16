const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    quizz_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('guess', guestSchema);