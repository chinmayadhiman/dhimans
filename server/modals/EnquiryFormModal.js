const mongoose = require('mongoose');

const EnquiryForm = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
            required: [true, 'Please add a email'],
        },
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters'],
            required: [true, 'Please add a phone number'],
        },
        country: {
            type: String,
            trim: true,
            required: [true, 'Please add a country name'],
        },
        message: {
            type: String,
            // maxlength: [500, 'Description can not be more than 500 characters'],
            required: [true, 'Please add a message'],
        }
    },
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }
);

module.exports = mongoose.model('EnquiryForm', EnquiryForm);