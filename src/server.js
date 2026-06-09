const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const logger = require("./middleware/logger.middleware");
app.use(logger);


app.get("/", (req, res) => {
  res.send("CharmCart API is running!");
});

const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const checkoutRoutes = require("./routes/checkout.routes");
const whatsappRoutes = require("./routes/whatsapp.routes");

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/whatsapp", whatsappRoutes);

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});