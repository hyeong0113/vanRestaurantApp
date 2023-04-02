const axios = require('axios');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

require('dotenv').config();

const generateGoogleAuth = (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        redirect_uri: `${process.env.URL}/auth/google/callback`
      });
    res.redirect(authUrl);
}

const googleLogIn = async (req, res) => {
    const code = req.query.code;
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;
    const ticket = await client.verifyIdToken({
        idToken,
        audience: CLIENT_ID
      });
    const { name, email } = ticket.getPayload();
    // TODO: Change path when google id exists in DB, not redirect to setting password
    res.redirect('/');
}
