import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@mui/styles';
import googleLogo from '../../assets/images/googleLogo.png';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '111%',
        width: '70%',
        fontFamily: 'Manrope, sans-serif !important',
        fontWeight: '560 !important',
        color: '#FFFFFF',
        backgroundColor: 'rgba(243, 178, 79, 0.81) !important',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: 'none',
        borderRadius: '5px'
    },
    logo: {
        height: 30,
        width: 30,
        verticalAlign: 'bottom',
        paddingRight: '3%'
    },
    text: {
        fontSize: 17,
        verticalAlign: 'super',
    }
}));

const GoogleLogInButton = () => {
    const classes = useStyles();

    const responseGoogle = (response) => {
        console.log("Success:: ");
        console.log(response);
    }

    const errorResponseGoogle = (response) => {
        console.log("Error:: ");
        console.log(response);
    }

    const customButton = ({ onClick }) => (
        <button
            className={classes.button}
            onClick={onClick}
        >
            <img
                className={classes.logo}
                src={googleLogo}
                alt="Google Logo"
            />
            <span className={classes.text}>
                CONTINUE WITH GOOGLE
            </span>
        </button>
      );

    return(
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            render={customButton}
            onSuccess={responseGoogle}
            onFailure={errorResponseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )


    
}

export default GoogleLogInButton;