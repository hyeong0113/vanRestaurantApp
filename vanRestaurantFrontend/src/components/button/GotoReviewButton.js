import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    reviewButton: {
        borderRadius: '10px !important',
        height: '25px !important',
    },
    buttonText: {
        color: '#FFFFFF'
    }
}));

const ReviewButton = (props) => {
    const classes = useStyles();
    return(
        <Button className={classes.reviewButton} variant="contained">
            <Typography className={classes.buttonText} variant="body1">
                Go To Reviews
            </Typography>
        </Button>
    );
}

export default ReviewButton;