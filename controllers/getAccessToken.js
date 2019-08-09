const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

async function getAccessToken(oAuth2Client, { req, res }) {
    const authUrl = await oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    })
    res.send({ authUrl })
}

module.exports = getAccessToken
