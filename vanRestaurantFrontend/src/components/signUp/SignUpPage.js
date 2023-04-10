import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import SubmitSignUpButton from '../button/SubmitSignUpButton';

// const username = process.env.REACT_APP_USERNAME;
// const password = process.env.REACT_APP_PASSWORD;

// const authString = btoa(`${username}:${password}`);

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100vh',
        backgroundColor: 'rgba(239, 198, 119, 0.82)',
        position: 'relative'
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
}));


const SignUpPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [profileObj, setProfileObj] = useState(null);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isProfileLoaded, setIsProfileLoaded] = useState(false);

    let navigate = useNavigate();
    const classes = useStyles();
    const location = useLocation();

    // TODO: Need to auto-fill email and proceed signup
    // const profileObj = location.state;

    useEffect(() => {
        if(location.state) {
            setIsProfileLoaded(true);
            setEmail(location.state);
        }
    }, []);
    

    const signUp = async() => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                userName: userName,
                password: password,
                confirmPassword: confirmPassword
            })
        };
        
        await fetch(`${process.env.REACT_APP_API_URL}/identity/signup`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    const { success } = result;
                    if (success) {
                        console.log("User sign up successful");
                        navigate('/login');
                    }
                    else {
                        console.log("User sign up failed");
                    }
                },
                (error) => {
                    console.log("User sign up failed:: ", error);
                }
            )
        setIsLoading(false);
    }

    const onChangeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onChangeUserNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const onChangePasswordlHandler = (event) => {
        setPassword(event.target.value);
    }

    const onChangeConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const onSubmitClickSignUp = async () => {
        await signUp();
    }

    return (
        <div className={classes.main}>
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
                        id="userName-input"
                        className={classes.text}
                        label="Username"
                        type="username"
                        value={userName}
                        onChange={onChangeUserNameHandler}
                        InputProps={{
                            className: classes.textHeight,
                        }}
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
                </Grid>                
                <Grid item>
                    <TextField
                        id="confirmPassword-input"
                        className={classes.text}
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={onChangeConfirmPasswordHandler}
                        InputProps={{
                            className: classes.textHeight,
                        }}
                    />
                </Grid>
                <Grid item>
                    <SubmitSignUpButton onClick={onSubmitClickSignUp} />
                </Grid>                
            </Grid>
        </div>
    )
}

export default SignUpPage;