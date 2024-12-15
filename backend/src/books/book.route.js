const express = require("express");
const router = express.Router();
const Book = require("./book.model");
const { postABook } = require("./book.controller");
const { getAllBooks } = require("./book.controller");
const { getSingleBook } = require("./book.controller");
const { updateBook } = require("./book.controller");
const { deleteBook } = require("./book.controller");
router.post("/create-books", postABook);

router.get("/", getAllBooks);

//single Book
router.get("/:id", getSingleBook);

//Update Book
router.put("/edit/:id", updateBook);

//Delete Book
router.delete("/:id", deleteBook);
module.exports = router;
