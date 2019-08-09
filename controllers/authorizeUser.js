const fs = require('fs')
const { google } = require('googleapis')
const credentials = require('../credentials')

async function getAccessToken(req, res) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    )
    const { code, email } = req.body

    // const authUrl = await oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: SCOPES,
    // })
    // res.send({ authUrl })
    const TOKEN_PATH = `${email}.json`

    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            res.status(400).send(err)
            return console.error('Error retrieving access token', err)
        }

        oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
            if (err) return res.status(400).send(err)
            res.send({
                status: 'Successfully stored token',
            })
            console.log('Token stored to', TOKEN_PATH)
        })
        // callback(oAuth2Client)
    })
}

module.exports = getAccessToken
