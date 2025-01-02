const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
