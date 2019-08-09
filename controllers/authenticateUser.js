const credentials = require('../credentials')
const authenticate = require('./authenticate')

const authorizeUser = (req, res) => {
    if (credentials) {
        return authenticate(credentials, { req, res })
    } else {
        if (err) return console.log('Error loading client secret file:', err)
    }
}

module.exports = authorizeUser
