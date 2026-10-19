import mongoose from "mongoose";




const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Введите заголовок статьи'],
        trim: true,
    },
    content: {
        type: String,
        minlength: [2000, 'Статья должна содержать минимум 2000 знаков'],

    },
    //массив ссылок на статьи, так как один тег относится к множеству статей
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: [true, 'Название тега обязательно'],
        index: true,
    }]
});

const Article = mongoose.model('Article', articleSchema);

export default Article;