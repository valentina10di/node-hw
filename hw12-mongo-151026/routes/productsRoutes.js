import { Router } from 'express';
import { 
    createProduct, 
    getProducts, 
    getProductById,
    updateProduct,
    deleteProduct 
} from '../controllers/productController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { validateProduct } from '../middlewares/validedateProduct.js';

const router = Router();

// Получить список всех продуктов
router.get('/', getProducts);

// Получить один продукт по ID (с проверкой ObjectId)
router.get('/:id', validateObjectId, getProductById);

// Создать новый продукт (с проверкой полей name и price)
router.post('/', validateProduct, createProduct);

// Обновить продукт по ID (проверяем и ID, и можно подключить validateProduct при необходимости)
router.put('/:id', validateObjectId, updateProduct);

// Удалить продукт по ID (с проверкой ObjectId)
router.delete('/:id', validateObjectId, deleteProduct);

export default router;
