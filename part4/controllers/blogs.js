const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '');
        console.log('Extracted token:', token);
        return token;
    }
    return null;
}



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
// notesRouter.post('/', async(request, response, next) => {


//     const { title, author, url, likes, userid } = request.body
//     const user = await User.findById(userid)
//     const note = new Blog({
//         title,
//         author,
//         url,
//         likes: likes === undefined ? 0 : likes,
//         user: user._id
//     })


//     if (title && author && url && likes) {

//         const savedNote = await note.save()
//         console.log(user.username)
//         user.blogs = user.blogs.concat(savedNote._id)
//         await user.save()
//         response.status(201).json(savedNote)
//     } else {
//         response.status(400).end()
//     }
// })
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const note = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })




    const savedNote = await note.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()
    console.log(savedNote._id)
    console.log(user.notes)
    response.status(201).json(savedNote)
})
blogsRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)


    const user = await User.findById(decodedToken.id)

    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user._id.toString() === user._id.toString()) {
        try {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } catch (exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }



    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)


    const user = await User.findById(decodedToken.id)

    const blogToUpdate = await Blog.findById(request.params.id)

    if (blogToUpdate.user._id.toString() === user._id.toString()) {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes

        }

        try {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            logger.info(`blog ${blog.title} successfully updated`)
            response.json(updatedBlog.toJSON())
        } catch (exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
})
module.exports = blogsRouter