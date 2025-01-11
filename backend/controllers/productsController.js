const path = require("path");
const multer = require("multer");
const productSchema = require("../models/productsModels");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the folder is accessible and created
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }); // Multer middleware for image upload

const fieldValidations = (req, res) => {
  const { name, description, sizesAvailable, sellerName } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Please provide a valid name" });
  }
  if (!description || description.trim() === "") {
    return res
      .status(400)
      .json({ message: "Please provide a valid Description" });
  }
  if (!sizesAvailable || sizesAvailable.length < 1) {
    return res.status(400).json({
      message: "Please provide details of sizes available for the item",
    });
  }
  if (!sellerName || sellerName.trim() === "") {
    return res.status(400).json({ message: "Please provide a seller name" });
  }
};

const uploadProduct = async (req, res) => {
  const { name, description, sizesAvailable, sellerName } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

  try {
    const product = new productSchema({
      name,
      description,
      sellerName,
      sizesAvailable,
      imageUrl,
    });
    await product.save();
    res
      .status(201)
      .json({ productDetails: product.toObject({ getters: true }) });
  } catch (error) {
    res.status(500).json({ error: "Error saving product" });
  }
};

const addProducts = async (req, res) => {
  fieldValidations(req, res);
  uploadProduct(req, res);
};

const removeProducts = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const product = await productSchema.findByIdAndDelete({ _id: id });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Product ID is required" });
  }
};

module.exports = { addProducts, removeProducts, upload };
