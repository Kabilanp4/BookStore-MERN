const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order({ ...req.body });
    await newOrder.save();
    console.log("hello");
    res.status(200).json({ message: "Order placed successfully", newOrder });
  } catch (err) {
    console.log("Error placing an order", err);
    res.status(500).json({ message: "Error placing an order", err });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error fetching orders", err);
    res.status(500).json({ message: "Error fetching an order", err });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
};
