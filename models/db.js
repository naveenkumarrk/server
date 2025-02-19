const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true,index: true  },
    rating: { type: Number, required: true, min: 0, max: 5 },
    genres: { type: [String], required: true,index: true  },  
    reviews: [
        {
            name: { type: String, required: true },
            review: { type: String, required: true }
        }
    ]
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
