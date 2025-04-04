import express from 'express';
import multer from 'multer';
import { createProduct, uploadCSV, getAllProducts, searchProducts } from '../controllers/productController.js';
import { authenticateAdmin, authenticateSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Super Admin Only Routes
router.post('/add-product', authenticateAdmin, authenticateSuperAdmin, createProduct);
router.post('/upload', authenticateAdmin, authenticateSuperAdmin, upload.single('file'), uploadCSV);

//public routes
router.get('/all-products', getAllProducts);
router.get('/search', searchProducts);

export default router;
