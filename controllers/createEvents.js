const fs = require('fs')
const { google } = require('googleapis')
const credentials = require('../credentials')
const { validator } = require('../controllers/validator')

async function calenderEvents(req, res, oAuth2Client) {
    const calendar = await google.calendar({
        version: 'v3',
        auth: oAuth2Client,
    })

    const {
        title,
        location,
        description,
        startTime,
        endTime,
        timezone,
        devemail,
    } = req.body

    const event = {
        summary: title,
        location: location,
        description: description,
        start: {
            dateTime: startTime,
            timeZone: timezone,
        },
        end: {
            dateTime: endTime,
            timeZone: timezone,
        },
        attendees: [{ email: devemail }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
    }

    const { error } = validator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    calendar.events.insert(
        {
            calendarId: 'primary',
            resource: event,
        },
        (err, response) => {
            if (err) {
                return res.status(400).send(err)
            }

            res.send(response.data)
        }
    )
}

function createEvent(req, res) {
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
                .status(401)
                .send({ message: 'Authorization failed', error: err })
        }
        oAuth2Client.setCredentials(JSON.parse(token))
        calenderEvents(req, res, oAuth2Client)
    })
}

module.exports = createEvent
