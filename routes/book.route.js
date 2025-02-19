const express = require("express")
const router = express.Router()
const {getBooks, getBook, createBook, updateBook, deleteBook} = require("../controllers/books.controller.js")

router.get("/", getBooks)
router.post("/", createBook)
router.get("/:id", getBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router