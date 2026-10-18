import { ObjectId } from "mongodb"
import { getDb } from "../db/index.js"

function productsCollection(){
    return getDb().collection('products')
}

export async function createProduct(req, res, next){
    try {
        const product = {
            ...req.body,
            createdAt: new Date(),
        }

        const result = await productsCollection().insertOne(product)
        res.status(201).json(result)

    } catch (error) {
        next(error)
    }
}

export async function getProducts(req, res, next) {
  try {
    // Искусственно вызываем ошибку
    // throw new Error("Тестовая ошибка сервера 500");

    const products = await productsCollection().find().toArray();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id)
    const product = await productsCollection().findOne({ _id: productId })
    
    if(!product){
        return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(product)
  } catch (error) {
    next(error);
  }
};

// Обновление продукта 
export async function updateProduct(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id);
    
    // Обновляем документ переданными данными из req.body
    const result = await productsCollection().findOneAndUpdate(
      { _id: productId },
      { $set: req.body },
      { returnDocument: 'after' } // возвращает обновленный документ
    );

    // В зависимости от версии драйвера результат может быть в .value или напрямую
    const updatedProduct = result.value || result;

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Удаление продукта 
export async function deleteProduct(req, res, next) {
  try {
    const productId = new ObjectId(req.params.id);
    
    const result = await productsCollection().deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};