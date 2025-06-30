import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { verifyJWT_username } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();

// Protected Routes
router.post('/', verifyJWT_username, createOrder);
router.get('/', verifyJWT_username, getOrders);
router.put('/:id/status', verifyJWT_username, updateOrderStatus);

export default router;
