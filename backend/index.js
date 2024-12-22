const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
const bookRouter = require("./src/books/book.route");
const orderRouter = require("./src/orders/order.route");
const usersRouter = require("./src/users/user.route");

app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", usersRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//mongoose connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
