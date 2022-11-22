const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSchema = new Schema({
    labname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('labs', labSchema);