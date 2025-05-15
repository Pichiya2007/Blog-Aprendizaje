import { Schema, model } from 'mongoose';

const CommentSchema = Schema({
    username: {
        type: String,
        required: true,
        maxLength: [50, 'Username must be less than 50 characters']
    },
    content: {
        type: String,
        required: true,
        maxLength: [500, 'Content must be less than 500 characters']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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

export default model('Comment', CommentSchema);