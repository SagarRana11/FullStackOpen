const Blog = require('../models/blog')
const User = require('../models/user')
const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}



notesRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
notesRouter.get('/:id', (request, response, next) => {
        Blog.findById(request.params.id)
            .then(note => {
                if (note) {
                    response.json(note)
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
notesRouter.post('/', async(request, response) => {
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
notesRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(203).end()
        })
        .catch(error => next(error))
})
notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = new Blog({
        content: body.content,
        important: body.important,
    })

    Blog.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
                .catch(error => next(error))
        })
})

module.exports = notesRouter