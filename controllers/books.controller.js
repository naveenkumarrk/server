const Book = require("../models/db.js")

const getBooks = async (req, res) => {
    const page = parseInt(req.query.p, 5) || 0;
    const booksPerPage = 5;
    try {
      const books = await Book.find({})
        .skip(page * booksPerPage)
        .limit(booksPerPage);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({
        message: "No products Found"
      });
    }
  };
  


const getBook = async(req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json({selectedBook: book})
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

const createBook = async(req, res) => {
    try {
        const product = await Book.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: "Error in adding Books"
        })
    }
}

const updateBook = async(req, res) => {
    try {
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedBook){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(updatedBook)

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

const deleteBook = async(req, res) => {
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook){
            res.status(404).json({message: "not found"})
            
        }
        res.status(200).json({message: "deleted successfully"})
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    getBooks, 
    getBook, 
    createBook, 
    updateBook, 
    deleteBook
}