import mongoose from "mongoose";




const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Название обязательно'],
        trim: true,
    },
    //массив ссылок на статьи, так как один тег относится к множеству статей
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article', 
        required: [true, 'Укажите статью'],
        index: true,
    }]
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;