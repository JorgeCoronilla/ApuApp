const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    
    storename: {
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

module.exports = mongoose.model('stores', storeSchema);
