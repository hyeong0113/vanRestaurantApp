import { useEffect } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { gapi } from 'gapi-script';

const LoginPage = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
                scope: ''
            })
        }

        gapi.load('client:auth2', start);
    })

    var token = gapi.auth.getToken().access_token;

    return (
        <GoogleLoginButton />
    )
}

export default LoginPage;