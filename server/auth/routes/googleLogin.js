const {google} = require('googleapis');
const router = require('express').Router();

function googleAuthCheck() {
    return router.post('/google', (req, res) => {
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_AUTH_CLIENT_ID,
                process.env.GOOGLE_AUTH_CLIENT_SECRET,
                process.env.GOOGLE_AUTH_REDIRECT_URL
            );

            const scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ];

            const result = oauth2Client.generateAuthUrl({
                // 'online' (default) or 'offline' (gets refresh_token)
                access_type: 'offline',

                // If you only need one scope you can pass it as a string
                scope: scopes
            });

            res.status(200).send({
                ok: true,
                url: result
            });

        } catch (error) {
            res.status(500).send({
                error: {
                    key: 'server_error',
                    message: 'Some error occured.',
                    status: 500
                }
            });
        }
    });
}

module.exports = googleAuthCheck;