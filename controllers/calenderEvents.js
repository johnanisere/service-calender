const fs = require('fs')
const { google } = require('googleapis')
const credentials = require('../credentials')

async function calenderEvents(res, oAuth2Client) {
    const calendar = await google.calendar({
        version: 'v3',
        auth: oAuth2Client,
    })

    calendar.events.list(
        {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        },
        (err, response) => {
            if (err) {
                return res.status(400).send(err)
            }
            const events = response.data.items
            res.send({ events })
        }
    )
}

function listEvents(req, res) {
    const { email } = req.query
    const TOKEN_PATH = `${email}.json`

    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    )

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return res.status(400).send(err)
        }
        oAuth2Client.setCredentials(JSON.parse(token))
        calenderEvents(res, oAuth2Client)
    })
}

module.exports = listEvents
