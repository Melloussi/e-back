// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    position: Number,
    imageUrl: String,
    itemUrl: String,
    itemTitle: String,
    quantity: Number,
});

module.exports = mongoose.model('Item', itemSchema);
