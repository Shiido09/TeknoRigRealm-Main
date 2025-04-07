import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Expo } from "expo-server-sdk";
import fetch from 'node-fetch';
// Create a new order
// export const createOrder = async (req, res) => {
//   try {
//     const { shippingInfo, orderItems, PaymentMethod, Courier, totalPrice } = req.body;

//     // Verify required fields
//     if (!shippingInfo || !shippingInfo.address || !shippingInfo.phoneNo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Please provide complete shipping information' 
//       });
//     }

//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'No order items found' 
//       });
//     }

//     // Validate each product in the orderItems array
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.status(404).json({ 
//           success: false, 
//           message: `Product not found with ID: ${item.product}` 
//         });
//       }

//       if (product.stocks < item.quantity) {
//         return res.status(400).json({ 
//           success: false, 
//           message: `Insufficient stock for ${product.product_name}. Available: ${product.stocks}` 
//         });
//       }
//     }

//     // Create new order
//     const order = new Order({
//       shippingInfo,
//       orderItems,
//       PaymentMethod,
//       Courier,
//       totalPrice,
//       user: req.user._id
//     });

//     // Save order to database
//     const createdOrder = await order.save();

//     // Update product stock quantities
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product);
//       if (product) {
//         product.stocks = Math.max(0, product.stocks - item.quantity);
//         await product.save();
//       }
//     }

//     res.status(201).json({ 
//       success: true, 
//       order: createdOrder 
//     });
//   } catch (error) {
//     console.error('Order creation error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

export const createOrder = async (req, res) => {

  try {
    const {
      user, // This is the user ID from the request body
      shippingInfo,
      orderItems,
      PaymentMethod,
      Courier,
      totalPrice,
    } = req.body;

    // Validate incoming data
    if (!user || !orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items or user ID provided.",
      });
    }

    // Check if the user exists in the database
    const userRecord = await User.findById(user);
    if (!userRecord) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Validate each product in the orderItems array
    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== orderItems.length) {
      return res.status(404).json({
        success: false,
        message: "One or more products not found.",
      });
    }

    // Check if quantities are available for each product
    for (let i = 0; i < orderItems.length; i++) {
      const product = products.find(
        (p) => p._id.toString() === orderItems[i].product
      );
      if (product.stocks < orderItems[i].quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.product_name}`,
        });
      }
    }

    // Create a new order
    const newOrder = new Order({
      user, // Use the user ID directly
      shippingInfo,
      orderItems,
      PaymentMethod,
      Courier,
      totalPrice,
    });

    // Save the order to the database
    const createdOrder = await newOrder.save();

    // Update product stock after saving the order
    for (let i = 0; i < orderItems.length; i++) {
      const product = await Product.findById(orderItems[i].product);

      // Ensure there's enough stock before reducing the quantity
      if (product.stocks >= orderItems[i].quantity) {
        product.stocks -= orderItems[i].quantity;
        await product.save(); // Save the updated product stock
      } else {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${product.product_name}`,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating the order. Please try again.",
    });
  }
};

// Get all orders for a user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'product_name product_images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// // Get all orders (Admin only)
// export const getAllOrders = async (req, res) => {
//   try {
//     // Ensure the user is an admin
//     if (!req.user.isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to access this resource',
//       });
//     }

//     const orders = await Order.find()
//       .populate('user', 'name email')
//       .populate('orderItems.product', 'product_name product_images price');

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'product_name product_images price');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     order.orderStatus = status;


//     if (status === 'Completed') {
//       order.deliveredAt = Date.now();
//     }

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order status updated successfully',
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findById(req.params.id).populate("user"); // Assuming `user` is a reference in the Order model

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     order.orderStatus = status;

//     if (status === "Completed") {
//       order.deliveredAt = Date.now();
//     }

//     await order.save();

//     // Send push notification
//     const expo = new Expo();
//     const user = await User.findById(order.user._id); // Fetch the user associated with the order

//     if (user && user.pushToken && Expo.isExpoPushToken(user.pushToken)) {
//       const messages = [
//         {
//           to: user.pushToken,
//           sound: "default",
//           title: "Order Status Updated",
//           body: `Your order status is now: ${status}`,
//           data: { orderId: order._id },
//         },
//       ];

//       try {
//         const ticket = await expo.sendPushNotificationsAsync(messages);
//         console.log('Notification ticket:', ticket);
//       } catch (error) {
//         console.error('Error sending notification:', error);
//       }
//     } else {
//       console.error('Invalid or missing push token:', user.pushToken);
//     } ole.log(user.pushToken);

//     res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    if (status === "Completed") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    // Send push notification
    const user = await User.findById(order.user._id);
    if (user && user.pushToken) {
      await sendPushNotification(
        user.pushToken,
        "Order Status Updated",
        `Your order status is now: ${status}`,
        { orderId: order._id } // Include orderId in the data
      );
    } else {
      console.error('Invalid or missing push token:', user?.pushToken);
    }
    console.log(user.pushToken);
    console.log("Order status updated:", status);
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendPushNotification = async (pushToken, title, body, data) => {
  try {
    const notificationPayload = {
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
      data: data, // Include the data object with orderId
    };

    // Log the notification payload
    console.log('Notification payload:', notificationPayload);

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationPayload),
    });

    const responseData = await response.json();
    console.log('Notification sent successfully:', responseData);
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }
};

export const getTopOrderedProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          totalQuantity: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $project: {
          _id: 0,
          productId: '$_id',
          totalQuantity: 1,
          productDetails: { $arrayElemAt: ['$productDetails', 0] }
        }
      }
    ]);



    res.status(200).json({ success: true, topProducts });
  } catch (error) {
    console.error('Error fetching top ordered products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top ordered products' });
  }
};