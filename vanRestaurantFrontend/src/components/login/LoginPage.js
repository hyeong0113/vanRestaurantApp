import { useEffect } from 'react';
import GoogleLoginButton from '../button/GoogleLoginButton';
import { gapi } from 'gapi-script';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

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
    forgotPassword: {
        textAlign: 'right',
        paddingRight: '15% !important'
    }
}));


const LoginPage = () => {
    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
                scope: ''
            })
        }

        gapi.load('client:auth2', start);
    })

    const classes = useStyles();
    // var token = gapi.auth.getToken().access_token;

    return (
        <div className={classes.main}>
            <Grid className={classes.box} container direction='column' rowSpacing={5}>
                <Grid item>
                    <TextField
                        id="outlined-password-input"
                        className={classes.text}
                        label="Email address"
                        type="email"
                        autoComplete="current-password"
                        InputProps={{
                            className: classes.textHeight,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-password-input"
                        className={classes.text}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        InputProps={{
                            className: classes.textHeight,
                        }}
                    />
                    <Typography className={classes.forgotPassword}>
                        Forgot Password?
                    </Typography>
                </Grid>
                <Grid item>
                    <GoogleLoginButton />
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage;