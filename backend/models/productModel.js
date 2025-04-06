import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, 'Please add a product name'], // Custom error message
    },
    product_images: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
      },
    ],
    price: {
      type: Number,
      required: [true, 'Please add a price'], // Custom error message
    },
    discount: {
      type: Number, 
      default: 0, 
    },
    stocks: {
      type: Number,
      required: true,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'], 
    },
    reviews: [
      {
        orderID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
          required: true, 
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      enum: [
        'Gaming PCs',
        'Laptops',
        'Components',
        'Peripherals',
        'Displays',
        'Networking',
        'Storage',
        'Audio',
      ],
      required: [true, 'Please select a category'], // Custom error message
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;