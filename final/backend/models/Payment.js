const mongoose = require('mongoose');
const { Schema } = mongoose;

let paymentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true }, //Unique Id by default genrate
    id:{type: String, required: true},
    amount: {
        value: { type: Number },
        currency: { type: String }
    },
    status: { type: String, required: true, default: "created" },
    paymentMode: { type: String, default: "not-selected" },
    agent:{
        type: String
    },
    expiryDate:{ type: Date },
    razorpay: {
        Link: { type: String },
        linkId: { type: String },
        expiresOn: { type: Date },
        status: { type: String }
    },
    name: { type: String},
    email: { type: String},
    phone: { type: String},
    pincode: { type: String},
    address: { type: String},
}, {
    versionKey: false,
    timestamps: true
});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;