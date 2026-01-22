const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Books', 'Stationary', 'Electronics'
    images: [{ type: String }], // Array of image URLs
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'available', enum: ['available', 'sold', 'pending'] },
    condition: { type: String, enum: ['New', 'Like New', 'Used', 'Damaged'] },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
