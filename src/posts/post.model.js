import { Schema, model } from 'mongoose';

const PostSchema = Schema({
    title: {
        type: String,
        required: true,
        maxLength: [50, 'Title must be less than 50 characters']
    },
    description: {
        type: String,
        required: true,
        maxLength: [500, 'Description must be less than 50 characters']
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)