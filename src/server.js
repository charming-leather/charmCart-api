const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CharmCart API is running!");
});

// Import my routes
const productRoutes = require("./routes/product.routes");

// Register my routes
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});