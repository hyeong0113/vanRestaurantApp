import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import SubmitSignUpButton from '../button/SubmitSignUpButton';

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

    const classes = useStyles();
    // var token = gapi.auth.getToken().access_token;

    return (
        <div className={classes.main}>
            <Grid className={classes.box} container direction='column' rowSpacing={4}>
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
                        label="Username"
                        type="username"
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
                </Grid>                
                <Grid item>
                    <TextField
                        id="outlined-password-input"
                        className={classes.text}
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        InputProps={{
                            className: classes.textHeight,
                        }}
                    />
                </Grid>
                <Grid item>
                    <SubmitSignUpButton />
                </Grid>                
            </Grid>
        </div>
    )
}

export default SignUpPage;