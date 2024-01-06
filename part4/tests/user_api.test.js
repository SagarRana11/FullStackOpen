const helper = require('./testHelper')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { before } = require('lodash')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('Sagar', 10)
        const user = new User({ username: 'Tanu', passwordHash })
        await user.save()
    })

    test('new creation', async() => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'Savvy',
            name: 'Sagar Rana',
            password: '@sagarrana119',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

        const userName = usersAtEnd.map(u => u.username)
        expect(userName).toContain(newUser.username)

    })
    test('invalid username', async() => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'Sag',
            name: 'Sagar Rana',
            password: '@sa',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length)

        // const userName = usersAtEnd.map(u => u.username)
        // expect(userName).toContain(newUser.username)

    })

})