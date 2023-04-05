import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleLogInButton from '../button/GoogleLogInButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import SignInButton from '../button/SignInButton';
import SignUpButton from '../button/SignUpButton';

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const authString = btoa(`${username}:${password}`);

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100vh',
        backgroundColor: 'rgba(239, 198, 119, 0.82)',
        position: 'relative'
    },
    title: {
        color: '#FFFFFF',
        position: 'relative',
        transform: 'translateY(170%)'
    },
    box: {
        position: 'absolute',
        transform: 'translate(75%, 45%)',
        width: '40% !important',
        height: '60%',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(103, 69, 18, 0.46)',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        paddingTop: 50
    },
    text: {
        width: '70% !important',
        border: '1px solid rgba(103, 69, 18, 0.46)',
        borderRadius: '5px'
    },
    forgotPassword: {
        textAlign: 'right',
        paddingRight: '15% !important'
    }
}));


const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isProfileLoaded, setIsProfileLoaded] = useState(false);

    const classes = useStyles();
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.state) {
            setIsProfileLoaded(true);
            setEmail(location.state);
        }
    }, [location.state]);

    const logIn = async() => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };        
        await fetch(`${process.env.REACT_APP_API_URL}/identity/login`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("User sign up successful");
                    console.log(result);
                    if (result) {
                        console.log(result);
                        localStorage.setItem("authenticated", true);
                        navigate('/');
                    }
                },
                (error) => {
                    console.log("User sign up failed");
                }
            )
        setIsLoading(false);
    }

    const onChangeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onChangePasswordlHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitClickLogIn = async () => {
        await logIn();
    }

    return (
        <div className={classes.main}>
            <Typography className={classes.title} variant='h2'>
                Welcome!
            </Typography>
            <Grid className={classes.box} container direction='column' rowSpacing={4}>
                <Grid item>
                    <TextField
                        id="email-input"
                        className={classes.text}
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={onChangeEmailHandler}
                        InputProps={{
                            className: classes.textHeight,
                        }}
                        disabled={isProfileLoaded}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="password-input"
                        className={classes.text}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onChangePasswordlHandler}
                        InputProps={{
                            className: classes.textHeight,
                        }}
                    />
                    <Typography className={classes.forgotPassword}>
                        Forgot Password?
                    </Typography>
                </Grid>
                <Grid item>
                    <SignInButton onClick={onSubmitClickLogIn} />
                </Grid>                
                <Grid item>
                    <GoogleLogInButton />
                </Grid>
                <Grid item>
                    <SignUpButton />
                </Grid>                
            </Grid>
        </div>
    )
}

export default LoginPage;