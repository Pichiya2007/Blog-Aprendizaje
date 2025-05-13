import { Router } from 'express';
import { check } from 'express-validator';
import { addCourse, getCourses, updateCourse } from './course.controller.js';

const router = Router();

router.post('/', addCourse)

router.put(
    '/:id',
    updateCourse
)

router.get('/', getCourses)

export default router;