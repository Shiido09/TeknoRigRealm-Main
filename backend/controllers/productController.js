import cloudinary from "../config/cloudinary.js"; 
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { User } from '../models/userModel.js';

// Create a Product
export const createProduct = async (req, res) => {
  try {
    const { product_name, price, stocks, description, category } = req.body;

    let product_images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        product_images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    const product = new Product({
      product_name,
      product_images,
      price,
      stocks,
      description,
      category,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { product_name, price, stocks, description, category } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let product_images = product.product_images;
    if (req.files) {
      // Delete old images from Cloudinary
      for (const img of product.product_images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Upload new images
      product_images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        product_images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    product.product_name = product_name;
    product.price = price;
    product.stocks = stocks;
    product.description = description;
    product.category = category;
    product.product_images = product_images;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const img of product.product_images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new product review
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, orderId, userId } = req.body;
    const productId = req.params.id;

    // Validate input
    if (!rating || !comment || !orderId || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields" 
      });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Check if user has already reviewed this product for this order
    const alreadyReviewed = product.reviews.find(
      review => review.orderID.toString() === orderId && review.user.toString() === userId
    );

    if (alreadyReviewed) {
      return res.status(400).json({ 
        success: false, 
        message: "You have already reviewed this product for this order" 
      });
    }

    // Create the review object
    const review = {
      orderID: orderId,
      user: userId,
      rating: Number(rating),
      comment
    };

    // Add review to the product
    product.reviews.push(review);
    
    // Update number of reviews
    product.numOfReviews = product.reviews.length;
    
    // Recalculate product rating if needed
    // This is optional but could be added to calculate average rating

    // Save the product with the new review
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Revenue
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats' });
  }
};
