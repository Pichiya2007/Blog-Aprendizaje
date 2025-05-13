import Post from './post.model.js';
import Course from '../courses/course.model.js';

export const addPost = async (req, res) => {
    try {
        
        const data = req.body;
        const course = await Course.findById(data.course);

        if (course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found',
                error: error.message
            })
        }

        const post = new Post({
            title: data.title,
            description: data.description,
            course: course
        })

        await post.save();

        return res.status(201).json({
            success: true,
            msg: 'Post add successfully',
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not add a post',
            error: error.message
        })
    }
}