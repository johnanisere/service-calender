const fs = require('fs')
const { google } = require('googleapis')
const credentials = require('../credentials')
const { validator } = require('../controllers/validator')

async function calenderEvents(req, res, oAuth2Client) {
    const calendar = await google.calendar({
        version: 'v3',
        auth: oAuth2Client,
    })

    const event = req.body
    const { error } = validator(event)
    if (error) return res.status(404).send(error.details[0].message)

    calendar.events.update(
        {
            auth: oAuth2Client,
            calendarId: 'primary',
            eventId: event.id,
            resource: event,
        },
        (err, response) => {
            console.log({ err, response })
            if (err) {
                return res.status(400).send(err)
            }
            res.send(response.data.items)
        }
    )
}

function updateEvent(req, res) {
    const { email } = req.body
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
            return res
                .status(400)
                .send({ message: 'Authorization failed', error: err })
        }
        oAuth2Client.setCredentials(JSON.parse(token))
        calenderEvents(req, res, oAuth2Client)
    })
}

module.exports = updateEvent
