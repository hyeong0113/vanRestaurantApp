import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    alertContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '50%',
        // height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF !important',
        zIndex: 9999
    },
    // alertContent: {
    //     // padding: 20px;
    //     border-radius: 5px;
    //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    // }
}));

const AlertTimeout = (props) => {
    const { message } = props;
    const classes = useStyles();
    return (
        <div>
            <Fade in={true}>
                <Alert className={classes.alertContainer} variant="outlined" severity="error">
                    <Typography>
                        {/* {message} */}
                        This is a test alert
                    </Typography>
                </Alert>
            </Fade>
        </div>
    )
}


export default AlertTimeout;