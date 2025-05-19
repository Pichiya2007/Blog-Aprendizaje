import Post from './post.model.js';
import Course from '../courses/course.model.js';

export const addPost = async (req, res) => {
    try {
        
        const data = req.body;
        const course = await Course.findById(data.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found',
                error: error.message
            })
        }

        const post = new Post({
            title: data.title,
            description: data.description,
            course: course._id
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

export const getPosts = async (req, res) => {
    try {

        const { limit = 10, since = 0 } = req.query;
        const query = { status: true };

        const posts = await Post.find(query)
            .skip(Number(since))
            .limit(Number(limit));

        const postsWithCourse = await Promise.all(posts.map(async (post) => {
            const course = await Course.findById(post.course);
            return {
                ...post.toObject(),
                course: course ? course.name : 'Course not found'
            }
        }))

        const total = await Post.countDocuments(query);

        res.status(200).json({
            success: true,
            msg: 'Posts fetched successfully',
            total,
            posts: postsWithCourse
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get a posts',
            error: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { _id, course, ...data } = req.body;
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                success: false,
                msg: 'Post not found',
            })
        }

        if (course) {
            const courseExists = await Course.findById(course);
            if (!courseExists) {
                return res.status(404).json({
                    success: false,
                    msg: 'Course not found'
                })
            }
            post.course = course;
        }


        Object.assign(post, data);
        await post.save();

        return res.status(200).json({
            success: true,
            msg: 'Post updated successfully',
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not update a post',
            error: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                msg: 'Post not found',
            })
        }

        post.status = false;
        await post.save();

        return res.status(200).json({
            success: true,
            msg: 'Post deleted successfully',
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not a delete post',
            error: error.message
        })
    }
}

export const getPostByTaller = async (req, res) => {
    try {

        const course = await Course.findOne({ name: 'Taller' })
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course "Taller" not found'
            })
        }

        const posts = await Post.find({ course: course._id, status: true }).populate('course', 'name')

        res.status(200).json({
            success: true,
            msg: 'Posts with course "Taller" fetched successfully',
            total: posts.length,
            posts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get posts by course name',
            error: error.message
        })
    }
}

export const getPostByPractica = async (req, res) => {
    try {

        const course = await Course.findOne({ name: 'Práctica Supervisada' });
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course "Taller" not found'
            })
        }

        const posts = await Post.find({ course: course._id, status: true }).populate('course', 'name')

        res.status(200).json({
            success: true,
            msg: 'Posts with course "Práctica Supervisada" fetched successfully',
            total: posts.length,
            posts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get posts by course name',
            error: error.message
        })
    }
}

export const getPostByTecnologia = async (req, res) => {
    try {

        const course = await Course.findOne({ name: 'Tecnología' });
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course "Taller" not found'
            })
        }

        const posts = await Post.find({ course: course._id, status: true }).populate('course', 'name')

        res.status(200).json({
            success: true,
            msg: 'Posts with course "Tecnología" fetched successfully',
            total: posts.length,
            posts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Could not get posts by course name',
            error: error.message
        })
    }
}