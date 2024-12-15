const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: "Book created successfully", newBook });
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Book creation failed", err });
  }
};

// Get all books

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    console.log(books);
    const response = res.status(200).send(books);
    console.log("response", response);
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Error fetching books", err });
  }
};
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Error fetching book", err });
  }
};
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBook) {
      return res.status(404).send({ message: "Book is not found" });
    }
    res.status(200).send(updateBook);
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Error updating the  book", err });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book is not found" });
    }
    res.status(200).send(updateBook);
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Error deleting the  book", err });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
