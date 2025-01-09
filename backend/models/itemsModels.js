const mongoose = require("mongoose");
const schema = mongoose.Schema;

const itemsSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sizesAvailable: [
    {
      size: { type: String, required: true },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  price: { type: String, required: true },
});

module.exports = mongoose.model("items", itemsSchema);