const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    deliveryPoint: {
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

module.exports = mongoose.model('deliveryPoints', deliverySchema);
