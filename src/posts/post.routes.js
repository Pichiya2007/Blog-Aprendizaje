import { Router } from 'express';
import { check } from 'express-validator';
import { addPost, deletePost, getPosts, getPostsByCourse, getPostByTaller, updatePost, getPostByPractica, getPostByTecnologia } from './post.controller.js';

const router = Router();

router.post(
    '/',
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('course', 'Course is required').notEmpty()
    ],
    addPost
)

router.get('/', getPosts)

router.get('/course/:id', getPostsByCourse)

router.put(
    '/:id',
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('course', 'Course is required').notEmpty()
    ],
    updatePost
)

router.delete('/:id', deletePost)

export default router;
