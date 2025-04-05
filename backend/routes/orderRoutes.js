import express from 'express';
import { 
  createOrder, 
  getMyOrders, 
  getOrderById,
  getAllOrders,
  updateOrderStatus, 
  getTopOrderedProducts
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);
router.get('/getAllOrders', getAllOrders);
router.put('/:id/status',updateOrderStatus)
router.get('/topProducts', getTopOrderedProducts);
router.get('/myorders', protect,getMyOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);


export default router;
