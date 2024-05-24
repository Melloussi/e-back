// models/Transfer.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    position: Number,
    imageUrl: String,
    itemUrl: String,
    itemTitle: String,
    quantity: Number,
    received: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
}, { _id: false });

const transferSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    items: [itemSchema]
});

// Create a text index on itemTitle
transferSchema.index({ 'items.itemTitle': 'text' });

module.exports = mongoose.model('Transfer', transferSchema);
