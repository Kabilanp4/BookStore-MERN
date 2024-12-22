const express = require("express");
const { createAOrder, getOrderByEmail } = require("./order.controller");
const router = express.Router();
//Posting an order
router.post("/", createAOrder);

//Getting an order by email

router.get("/email/:email", getOrderByEmail);

module.exports = router;
