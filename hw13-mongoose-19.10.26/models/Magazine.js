import mongoose from "mongoose";




const magazineSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Название журнала обязательно'],
        trim: true,
    }, 
    issueNumber: {
        type: Number,
        required: [true, 'Укажите номер выпуска'],
        min: [1, 'Номер выпуска не может быть < 1'],
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: [true, 'Укажите издателя']
    }
});

const Magazine = mongoose.model('Magazine', magazineSchema);

export default Magazine;