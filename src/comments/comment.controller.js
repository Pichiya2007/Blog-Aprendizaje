import Comment from './comment.model.js';
import Post from '../posts/post.model.js';

export const addComment = async (req, res) => {
    try {
        
        const data = req.body;
        const post = await Post.findById(data.post);

        if (!post) {
            return res.status(404).json({
                success: false,
                msg: 'Post not found',
            })
        }

        const comment = new Comment({
            ...data,
            post: post._id
        })

        await comment.save();

        return res.status(201).json({
            success: true,
            msg: 'Comment added successfully',
            comment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not add a comment',
            error: error.message
        })
    }
}

export const getComments = async (req, res) => {
    try {

        const { limit = 10, since = 0 } = req.query;
        const query = { status: true };

        const comments = await Comment.find(query)
            .skip(Number(since))
            .limit(Number(limit));

        const commentsWithPost = await Promise.all(comments.map(async (comment) => {
            const post = await Post.findById(comment.post);
            return {
                ...comment.toObject(),
                post: post ? post.title : 'Post not found'
            }
        }))   

        const total = await Comment.countDocuments(query);

        return res.status(200).json({
            success: true,
            msg: 'Comments fetched successfully',
            total,
            comments: commentsWithPost
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get comments',
            error: error.message
        })
    }
}