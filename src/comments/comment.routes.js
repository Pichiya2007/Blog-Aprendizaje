import { Router } from 'express';
import { check } from 'express-validator';
import { addComment, getComments } from './comment.controller.js';

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

export default router;