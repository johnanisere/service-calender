const credentials = {
    installed: {
        client_id: `${process.env.CLIENT_ID}`,
        project_id: `${process.env.PROJECT_ID}`,
        auth_uri: `${process.env.AUTH_URI}`,
        token_uri: `${process.env.TOKEN_URI}`,
        auth_provider_x509_cert_url: `${process.env.AUTH_PROVIDER_X509_CERT_URL}`,
        client_secret: `${process.env.CLIENT_SECRET}`,
        redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost:3000'],
    },
}

module.exports = credentials
