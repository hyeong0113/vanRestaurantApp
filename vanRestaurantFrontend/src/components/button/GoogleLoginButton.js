import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
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
    const [ user, setUser ] = useState(null);

    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                }}
            )
            .then((response) => response.json())
            .then((data) => responseGoogle(data))
            .catch((err) => console.log(err));
        }
    }, [user]);

    const responseGoogle = async (response) => {
        if(response) {
            const { email } = response;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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

    const login = useGoogleLogin({
        onSuccess: credentialResponse => setUser(credentialResponse),
        onError: error => errorResponseGoogle(error)
    });

    return(
        <button
            className={classes.button}
            onClick={() => login()}
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
    )
}

export default GoogleLogInButton;