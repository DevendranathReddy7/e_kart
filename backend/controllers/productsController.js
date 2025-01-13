const path = require("path");
const multer = require("multer");
const productSchema = require("../models/productsModels");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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
    res.status(201).json({
      productDetails: product.toObject({ getters: true }),
      message: "Product added sucessfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error: error });
  }
};

const addProducts = async (req, res) => {
  fieldValidations(req, res);
  uploadProduct(req, res);
};

const removeProducts = async (req, res) => {
  const { id } = req.params;
  const existingProduct = await productSchema.findOne({ _id: id });

  if (id && existingProduct) {
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
    return res
      .status(400)
      .json({ message: "No Products found with the provided id!" });
  }
};

const updateProducts = async (req, res) => {
  fieldValidations(req, res);
  const { name, description, sizesAvailable, sellerName, imageUrl } = req.body;
  const { id } = req.params;

  const existingProduct = await productSchema.findOne({ _id: id });

  if (id && existingProduct) {
    try {
      await productSchema.findByIdAndUpdate(
        { _id: id },
        {
          name,
          description,
          sellerName,
          sizesAvailable,
          imageUrl,
        },
        { new: true, runValidators: true }
      );
      res.status(201).json({
        message: "Product updated sucessfully!",
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  } else {
    res.status(400).json({
      message: "we couldn't find any product details with the provided id.",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching products", error });
  }
};

module.exports = {
  addProducts,
  removeProducts,
  updateProducts,
  upload,
  getProducts,
};
