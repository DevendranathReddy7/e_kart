const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productsSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // sizesAvailable: [
  //   {
  //     size: { type: String, required: true },
  //     stock: { type: Number, required: true },
  //     price: { type: Number, required: true },
  //   },
  // ],
  sellerName: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("products", productsSchema);
