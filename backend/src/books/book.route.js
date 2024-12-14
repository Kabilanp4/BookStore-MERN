const express = require("express");
const router = express.Router();
const Book = require("./book.model");
const { postABook } = require("./book.controller");
const { getAllBooks } = require("./book.controller");
const { getSingleBook } = require("./book.controller");
router.post("/create-books", postABook);

router.get("/", getAllBooks);

//single Book
router.get("/:id", getSingleBook);
module.exports = router;
