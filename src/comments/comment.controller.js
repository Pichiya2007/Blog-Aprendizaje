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

export const updateComment = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { _id, post, ...data } = req.body;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found',
            })
        }

        if (post) {
            const postExists = await Post.findById(post);
            if (!postExists) {
                return res.status(404).json({
                    success: false,
                    msg: 'Post not found'
                })
            }
            comment.post = post;
        }

        Object.assign(comment, data);
        await comment.save();

        return res.status(200).json({
            success: true,
            msg: 'Comment updated successfully',
            comment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg:'Could not update a commment',
            error: error.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: 'Comment not found',
            })
        }

        comment.status = false;
        await comment.save();

        return res.status(200).json({
            success: true,
            msg: 'Comment deleted successfully',
            comment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not delete a comment',
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

export const getCommentsByPost = async (req, res) => {
    try {

        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                msg: 'Post not found'
            })
        }

        const comments = await Comment.find({ post: id, status: true });

        return res.status(200).json({
            success: true,
            msg: 'Comments fetched successfully',
            total: comments.length,
            comments,
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get comments by post',
            error: error.message
        })
    }
}