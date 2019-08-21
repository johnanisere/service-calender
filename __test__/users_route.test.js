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

describe('create the users calender events', () => {
    const title = 'Book a DecaDev'
    const location = 'Decagon Institute'
    const description = 'Interview for the role of an intermediate dev'
    const startTime = '10am'
    const endTime = '12pm'
    const timezone = 'Angeles Arizona'
    const devemail = 'charleslukes28@gmail.com'

    // since the user is not verified this test will return an error
    test('should error when user is not', () => {
        return request(app)
            .post('/create-event')
            .send({
                title,
                location,
                description,
                startTime,
                endTime,
                timezone,
                devemail,
            })
            .expect(res => {
                expect(Object.keys(res.body)).toContain('message')
                expect(Object.keys(res.body)).toContain('error')
            })
    })
})

describe('Update the users calender events', () => {
    const title = 'Book another DecaDev'
    const location = 'Decagon Institute Lagos'
    const description = 'Interview for the role of an intermediate dev'
    const startTime = '1pm'
    const endTime = '3pm'
    const timezone = 'Angeles Arizona'
    const devemail = 'charleslukes28@gmail.com'

    test('', () => {
        return request(app)
            .patch('/update-event')
            .send({
                title,
                location,
                description,
                startTime,
                endTime,
                timezone,
                devemail,
            })
            .expect(res => {
                expect(Object.keys(res.body)).toContain('message')
                expect(Object.keys(res.body)).toContain('error')
            })
    })
})
