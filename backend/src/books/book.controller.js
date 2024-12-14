const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book created successfully", book: newBook });
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
    res
      .status(200)
      .send({ message: "Books fetched successfully", books: books });
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
    res.status(200).send({ message: "Book fetched successfully", book: book });
  } catch (err) {
    console.log("Error creating book", err);
    res.status(500).send({ message: "Error fetching book", err });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
};
