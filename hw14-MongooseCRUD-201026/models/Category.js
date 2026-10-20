import mongoose from "mongoose";



const categorySchema =  new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Название категории обязательно'],
        trim: true,
        unique: true,
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;