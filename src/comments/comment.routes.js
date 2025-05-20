import { Router } from 'express';
import { check } from 'express-validator';
import { addComment, getComments, updateComment, deleteComment, getCommentsByPost } from './comment.controller.js';

const router = Router();

router.post(
    '/',
    [
        check('username', 'Username is required').notEmpty(),
        check('content', 'Content is required').notEmpty(),
        check('post', 'Post ID is required').notEmpty()
    ],
    addComment
)

router.get('/', getComments)

router.get('/:id', getCommentsByPost)

router.put(
    '/:id',
    [
        check('username', 'Username is required').notEmpty(),
        check('content', 'Content is required').notEmpty(),
        check('post', 'Post ID is required').notEmpty()
    ],
    updateComment
)

router.delete('/:id', deleteComment)

export default router;