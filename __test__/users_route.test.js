const request = require('supertest')
const app = require('../app')

//since the token expires every one hour, how do I test for the correct output.
const authUrl = 'kwlnemblwirehjkrhjbrn'

describe('Authenticates the users', () => {
    test('verifies that the authUrl was sent', () => {
        return request(app)
            .post('/authenticate-user')
            .send({})
            .expect(res => {
                expect(Object.keys(res.body)).toContain('authUrl')
            })
    })
})

describe('Authorize the users', () => {
    //this is an invalid code and I am testing that it actually fails.
    const email = 'xyz@gmail.com'
    const code = 'hjsnmlabiwkjermhduikjheiulkjmhw'
    test('authorize the user', () => {
        return request(app)
            .post('/authorize-user')
            .send({ email, code })
            .expect(res => {
                expect(res).toMatchObject({ status: 400 })
            })
    })
})

describe('List the users events', () => {
    const email = 'xyz@gmail.com'
    test('calender events of a user', () => {
        return request(app)
            .get('/calender-events')
            .query(email)
            .expect(res => {
                expect(res.req.data).toBe(undefined)
                expect(res).toMatchObject({ status: 400 })
            })
    })
})
