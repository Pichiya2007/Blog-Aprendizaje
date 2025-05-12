import { Router } from 'express';
import { check } from 'express-validator';
import { addCourse } from './course.controller.js';

const router = Router();

router.post('course', addCourse)

export default router;