const mongoose = require('mongoose');

const addProduct = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            // required: [true, 'Please add a description'],
        },
        price: {
            fob: {
                type: Number,
                // type: String,
                // required: [true, 'Please add a Fob Price'],
            },
            exwork: {
                type: Number,
                // type: String,
                // required: [true, 'Please add a exwork Price'],
            },

        },
        moq: {
            type: Number,
            // type: String,
            // required: [true, 'Please add a moq'],
        },
        category: {
            type: String,
            // maxlength: [20, 'Phone number can not be longer than 20 characters'],
            // required: [true, 'Please add a catogory'],
        },
        image: {
            type: String
            // data: Buffer,
            // ContentType: [String],
            // required: [true, 'Please add a Image'],
        },
        specifications: {
            color: {
                type: String,
                // required: [true, 'Please add a color field'],
            },
            dimensions: {
                length: {
                    type: Number,
                    // type: String,
                    // required: [true, 'Please add a length value'],
                },
                bredth: {
                    type: Number,
                    // type: String,
                    // required: [true, 'Please add a bredth value'],
                },
                height: {
                    type: Number,
                    // type: String,
                    // required: [true, 'Please add a height value'],
                },
            },
            features: {
                type: String,
                // required: [true, 'Please add a features'],
            },
        },
        offers: {
            type: String,
        }
    },
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }
);

module.exports = mongoose.model('addProduct', addProduct)