import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {

    const responseGoogle = (response) => {
        console.log("Success:: ");
        console.log(response);
    }

    const errorResponseGoogle = (response) => {
        console.log("Error:: ");
        console.log(response);
    }

    return(
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={errorResponseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )


    
}

export default GoogleLoginButton;