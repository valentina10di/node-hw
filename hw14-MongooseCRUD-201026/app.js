import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';


const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_URL;

const app = express();

app.use(express.json());

app.get('/', (_req, res, _next)=>{
    res.send('Home page');
});

app.post('/categories', async(req, res, _next)=>{
    try {
        const {name} =req.body ?? {};
    if(!name) {
        return res.status(400).json({
            error: 'Name is require',
        });
    }

    const category = new Category({name});
    await category.save();
    res.status(201).json(category);

    } catch (error) {
        console.error(error.message);
    }
});

app.post('/products', async(req, res, _next)=>{
    try {
        // Извлекаем имя, цену и ID категории из тела запроса
        const {name, price, category} =req.body ?? {};

        // Проверяем, переданы ли все обязательные поля
    if(!name || !price || !category) {
        return res.status(400).json({
            error: 'Заполните все обязательные поля: name, price, category',
        });
    }
    // Создаем новый документ продукта, где category — это ObjectId существующей категории
    const product = new Product({name,price, category });
    await product.save();

    res.status(201).json(category);

    } catch (error) {
        console.error(error.message);
    }
});

// 3. Маршрут GET /products с использованием populate
app.get('/products', async (req, res, next) => {
    try {
        // Находим все продукты и используем метод populate('category'),
        // чтобы вместо ObjectId подгрузить полную информацию о связанной категории
        const products = await Product.find().populate('category');

        // Отправляем список продуктов клиенту
        res.status(200).json(products);

    } catch (error) {
        console.error(error.message);
    
    }
});

async function start() {
    try {
        await mongoose.connect(dbURL);
    console.log("Successfully connected to mongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    } catch (error) {
       console.error("MongoDB connection error", error.message);
    process.exit(1); 
    }
};

start();