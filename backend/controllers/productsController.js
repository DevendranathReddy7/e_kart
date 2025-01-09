const path = require("path");
const multer = require("multer");
const productSchema = require("../models/productsModels");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure the folder is accessible and created
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }); // Multer middleware for image upload

const fieldValidations = (req, res) => {
  const { title, description, sizesAvailable, sellerName } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Please provide a valid Title" });
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
  const { title, description, sizesAvailable, sellerName } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

  try {
    const product = new productSchema({
      title,
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

const addproducts = async (req, res) => {
  fieldValidations(req, res);
  uploadProduct(req, res);
};

const removeproducts = async () => {};

module.exports = { addproducts, removeproducts, upload };
