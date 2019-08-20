import request from 'supertest'
import users from '../routes/index'
import app from '../app'

//mocking the credentials
const credentials = {
    installed: {
        client_secret: 'a client secret',
        client_id: 'a client Id',
        redirect_uris: 'a redirect uri',
    },
}

const { client_secret, client_id, redirect_uris } = credentials.installed
const googleAuth = jest.fn(x => {
    client_secret, client_id, redirect_uris
})
