const fs = require('fs')
const { google } = require('googleapis')
const getAccessToken = require('./getAccessToken')

function authorize(credentials, { req, res }) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    )
    const { email } = req.body
    const TOKEN_PATH = `${email}.json`
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, { req, res })
        oAuth2Client.setCredentials(JSON.parse(token))
        res.send({ message: 'user already signIn' })
    })
}

module.exports = authorize
