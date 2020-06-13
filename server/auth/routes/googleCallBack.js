
const router = require('express').Router();
const {google} = require('googleapis');

function googleCallBack() {
    return router.get('/googlecb', async(req, res) => {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_AUTH_CLIENT_ID,
            process.env.GOOGLE_AUTH_CLIENT_SECRET,
            process.env.GOOGLE_AUTH_REDIRECT_URL
        );
        const {tokens} = await oauth2Client.getToken(req.query.code);
        const {id_token} = tokens;
        await oauth2Client.setCredentials(tokens);
        const data = await oauth2Client.verifyIdToken({idToken: id_token});
        console.log({ data, tokens})

        // const gmail = google.gmail({version: 'v1', auth: oauth2Client});
        // const {data: userData} = await gmail.users.getProfile({userId: 'me'});
        // console.log(userData);
        res.send({message: 'redirected'});
        // req.ur
    });
}

module.exports = googleCallBack;