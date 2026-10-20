import mongoose from "mongoose";




const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Название продукта обязательно'],
        trim: true,
    },

    price: {
        type: Number,
        required: [true, 'Цена обязательна'],
        min: [0, 'Цена не может быть меньше 0']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Укажите категорию'],
        index: true,
    }
});

const Product = mongoose.model('Product', productSchema); 

export default Product;