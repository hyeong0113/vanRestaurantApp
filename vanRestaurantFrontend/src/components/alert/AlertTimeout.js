import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    alertContainer: {
        position: 'fixed',
        transform: 'translate(50%, 50%)',
        width: '50%',
        alignItems: 'center',
        zIndex: 9999,
        borderColor: '#D32F2F',
        borderStyle: 'solid'
    }
}));

const AlertTimeout = (props) => {
    const { isError, message, setIsError } = props;
    const classes = useStyles();

    const handleFadeOut = () => {
        setTimeout(() => {
            setIsError(false);
        }, 3000);
    }

    return (
        <div>
            <Fade in={isError} addEndListener={handleFadeOut} easing="ease">
                <Alert className={classes.alertContainer} severity="error">
                    <Typography>
                        {message}
                    </Typography>
                </Alert>
            </Fade>
        </div>
    )
}


export default AlertTimeout;