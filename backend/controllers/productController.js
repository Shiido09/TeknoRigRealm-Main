import cloudinary from "../config/cloudinary.js";
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { User } from '../models/userModel.js';
import { sendPushNotification } from './orderController.js';
// Create a Product
export const createProduct = async (req, res) => {
  try {
    const { product_name, price, discount, stocks, description, category } = req.body;

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
      discount, // Include discount in product creation
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
    const { product_name, price, discount, stocks, description, category } = req.body;

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

    // Update product fields
    product.product_name = product_name;
    product.price = price;
    product.discount = discount; // Update discount
    product.stocks = stocks;
    product.description = description;
    product.category = category;
    product.product_images = product_images;

    await product.save();

    // Send push notification if discount is updated
    if (discount > 0) {
      const users = await User.find({ pushToken: { $exists: true, $ne: null } }); // Get users with push tokens
      const notificationPayload = {
        title: "New Discount Available!",
        body: `${product_name} is now available at ${discount}% off!`,
        data: { productId: product._id },
      };

      for (const user of users) {
        if (user.pushToken) {
          await sendPushNotification(user.pushToken, notificationPayload.title, notificationPayload.body, notificationPayload.data);
        }
      }
    }

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

// Update a product review
export const updateProductReview = async (req, res) => {
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

    // Find the existing review
    const reviewIndex = product.reviews.findIndex(
      review => review.orderID.toString() === orderId && review.user.toString() === userId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // Update the review
    product.reviews[reviewIndex].rating = Number(rating);
    product.reviews[reviewIndex].comment = comment;

    // Save the updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: product.reviews[reviewIndex]
    });
  } catch (error) {
    console.error("Error updating review:", error);
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

    // Total Reviews
    const totalReviews = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: '$numOfReviews' }, // Sum up numOfReviews from all products
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      totalReviews: totalReviews[0]?.totalReviews || 0, // Include totalReviews in the response
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats' });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    // Aggregate all reviews from all products
    const products = await Product.find().populate('reviews.user', 'name email'); // Populate user details
    const allReviews = products.flatMap((product) =>
      product.reviews.map((review) => ({
        productId: product._id,
        productName: product.product_name,
        ...review._doc, // Spread review details
      }))
    );
    console.log('All Reviews:', allReviews);
    res.status(200).json({ success: true, reviews: allReviews });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};