const mongoose = require('mongoose');

const addFaqModal = new mongoose.Schema(
    {
        category: {
            type: String,
            // required: [true, 'Please add a category'],
        },
        quesBody: [{
            question: {
                type: String,
                // required: [true, 'Please add a question'],
            },
            answer: {
                type: String,
                // required: [true, 'Please add a answer'],
            },
            blog: {
                type: String,
            },
            youtube: {
                type: String
            }
        }],
    },
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }
);

module.exports = mongoose.model('addFaqModal', addFaqModal)