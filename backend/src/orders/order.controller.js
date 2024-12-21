const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order({ ...req.body });
    await newOrder.save();
    console.log("hello");
    res.status(200).send({ message: "Order placed successfully", newOrder });
  } catch (err) {
    console.log("Error placing an order", err);
    res.status(500).send({ message: "Error placing an order", err });
  }
};

module.exports = {
  createAOrder,
};
