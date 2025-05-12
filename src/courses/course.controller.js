import Course from './course.model.js';

export const addCourse = async (req, res) => {
    try {

        const data = req.body;

        const course = new Course({
            name: data.name,
            description: data.description
        })

        await course.save();

        return res.status(201).json({
            success: true,
            msg: 'Course add successfully',
            course
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not add a course',
            error: error.message
        })
    }
}