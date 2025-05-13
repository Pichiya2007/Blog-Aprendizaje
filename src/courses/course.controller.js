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

export const updateCourse = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const course = await Course.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: false,
            msg: 'Course update successfully',
            course
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not update a course',
            error: error.message
        })
    }
}

export const getCourses = async (req, res) => {
    try {
        
        const { limit = 10, since = 0 } = req.query;
        const query = { status: true };

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ])

        res.status(200).json({
            success: true,
            total,
            courses
        })

    } catch (error) {
        return res.status(200).json({
            success: false,
            msg: 'Error getting courses',
            error: error.message
        })
    }
}