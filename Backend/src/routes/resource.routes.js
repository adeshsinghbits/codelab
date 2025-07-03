import express from 'express';

import { getAllResources, getResourceById, createResource, uploadfile, updateResource, deleteResource, getResourcesByFreelancer } from '../controllers/resource.controller.js';
import { verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
// Public routes
router.get('/', getAllResources);
router.get('/:id', getResourceById);

// Protected routes (require authentication)
router.post('/', verifyJWT_username, createResource);
router.get('/freelancer/:freelancerId', verifyJWT_username, getResourcesByFreelancer);
router.route("/upload").post(verifyJWT_username, upload.fields([{ name: "file", maxCount: 1 }]), uploadfile);
router.put('/:id', verifyJWT_username, updateResource);
router.delete('/:id', verifyJWT_username, deleteResource);

export default router;
