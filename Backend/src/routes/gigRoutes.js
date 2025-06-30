import express from 'express';
import {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  getGigsByFreelancer,
  toggleFavoriteGig,
} from '../controllers/gigController.js';
import { verifyJWT_username } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllGigs);
router.get('/:id', getGigById);

// Protected Routes
router.post('/', verifyJWT_username, createGig);
router.put('/:id', verifyJWT_username, updateGig);
router.delete('/:id', verifyJWT_username, deleteGig);
router.get('/freelancer/:freelancerId', verifyJWT_username, getGigsByFreelancer);

router.put('/:id/favorite', verifyJWT_username, toggleFavoriteGig);


export default router;
