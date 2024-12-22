const express = require("express");
const router = express.Router();
const Book = require("./book.model");
const { postABook } = require("./book.controller");
const { getAllBooks } = require("./book.controller");
const { getSingleBook } = require("./book.controller");
const { updateBook } = require("./book.controller");
const { deleteBook } = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
router.post("/create-books", verifyAdminToken, postABook);

router.get("/", getAllBooks);

//single Book
router.get("/:id", getSingleBook);

//Update Book
router.put("/edit/:id", verifyAdminToken, updateBook);

//Delete Book
router.delete("/:id", verifyAdminToken, deleteBook);
module.exports = router;
