const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.listWithMultipleBlogs)
})

test('http get request test', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog has id but not _id', async() => {
    const blogList = await listHelper.blogsInDb()
    console.log(blogList)
    const blog = blogList[0]


    expect(blog.id).not.toBe(undefined)
    expect(blog._id).toBe(undefined)





})

test('add a blog to the db', async() => {

    const blog = {

        title: 'a post test object content',
        author: 'Sagar Rana',
        url: 'testpostrequest.com',
        likes: 5,


    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-type', /application\/json/)


    const notesAtEnd = await listHelper.blogsInDb()
    console.log(notesAtEnd)
    expect(notesAtEnd).toHaveLength(listHelper.listWithMultipleBlogs.length + 1)
    const Author = notesAtEnd.map(r => r.author)
    expect(Author).toContain('Sagar Rana')
})

test('testing blog with no likes', async() => {

    const blog = {

        title: 'A blog with no likes',
        author: 'Tanu Lamba',
        url: 'testnolikepostrequest.com',



    }

    const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-type', /application\/json/)


    const notesAtEnd = await listHelper.blogsInDb()
    console.log(notesAtEnd)
    expect(notesAtEnd).toHaveLength(listHelper.listWithMultipleBlogs.length + 1)
    const Likes = notesAtEnd.map(r => r.likes)
    expect(Likes).toContain(0)

})
test('testing blog with incomplete data', async() => {

    const initialBlogs = await listHelper.blogsInDb()

    const blog = {

        title: 'A blog with no likes',
        author: 'Tanu Lamba',
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
    const blogsAtEnd = await listHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

})








test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})




test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
})


test('when list has multiple blogs, equals the sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(listHelper.listWithMultipleBlogs)
    expect(result).toBe(36)
})

test('author with most likes', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    const likes = result.likes
    expect(likes).toBe(5)
})

test('author with most mention', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    const author = result.author
    expect(author).toBe('Edsger W. Dijkstra')
})