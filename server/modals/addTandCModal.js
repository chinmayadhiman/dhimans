const mongoose = require('mongoose');

const addTandCModal = new mongoose.Schema(
    {
        payment: {
            type: String,
            // required: [true, 'Please add a category'],
        },
        shipment: {
            type: String,
            // required: [true, 'Please add a category'],
        },
        TandC: {
            type: String,
            // required: [true, 'Please add a category'],
        },

    }
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }
);

module.exports = mongoose.model('addTandCModal', addTandCModal)