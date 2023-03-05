const Product = require('../models/ProductModel');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new product
exports.createProduct = async (req, res) => {
  const { title, description, price, image, quantity } = req.body;

  const product = new Product({
    title,
    description,
    price,
    image,
    quantity
  });

  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct,);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a product by ID
exports.updateProduct = async (req, res) => {
  const { title, description, price, image, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        image,
        quantity
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
