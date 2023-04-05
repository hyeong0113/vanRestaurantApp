import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '102%',
        width: '70%',
        backgroundColor: 'rgba(239, 198, 119, 0.82) !important',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: 'none',
        borderRadius: '5px'
    },
    text: {
        fontSize: 17,
        verticalAlign: 'super',
        color: '#FFFFFF',
        fontWeight: '560 !important',
    }
}));

const SignInButton = (props) => {
    const { onClick } = props;
    const classes = useStyles();
    return(
        <Button className={classes.button} onClick={onClick}>
            <Typography className={classes.text}>
                SIGN IN
            </Typography>
        </Button>
    )
}

export default SignInButton;