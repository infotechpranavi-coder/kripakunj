import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
        ],
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot be more than 20 characters'],
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        maxlength: [100, 'Subject cannot be more than 100 characters'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [2000, 'Message cannot be more than 2000 characters'],
    },
    category: {
        type: String,
        default: 'General',
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
