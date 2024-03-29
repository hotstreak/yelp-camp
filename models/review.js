const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = ({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;