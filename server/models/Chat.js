const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [messageSchema],
    productContext: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Optional: link chat to a specific product
    lastMessage: { type: String },
    lastMessageTime: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
