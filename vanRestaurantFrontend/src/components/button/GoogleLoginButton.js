import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { makeStyles } from '@mui/styles';
import googleLogo from '../../assets/images/googleLogo.png';

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const authString = btoa(`${username}:${password}`);

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
    const navigate = useNavigate();

    const responseGoogle = async (response) => {
        const { credential } = response;
        if(credential) {
            const decoded = jwt_decode(credential);
            const { email } = decoded;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authString}`
                },
                body: JSON.stringify({
                    email: email
                })
            };
            await fetch(`${process.env.REACT_APP_API_URL}/identity/google/check`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Google check:: ", result);
                    const { registered } = result;
                    if (registered) {
                        navigate('/login', { state: email });
                    }
                    else {
                        navigate('/signup', { state: email });
                    }
                },
                (error) => {
                    console.log(error);
                    console.log("User sign up failed");
                }
            )            
            
        }
    }

    const errorResponseGoogle = (response) => {
        console.log("Google Error:: ");
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
            onSuccess={responseGoogle}
            onError={errorResponseGoogle}
        />
    )


    
}

export default GoogleLogInButton;