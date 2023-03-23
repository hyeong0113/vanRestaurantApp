import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    reviewButton: {
        borderRadius: '10px !important',
        height: '25px !important',
    },
    buttonText: {
        fontSize: '15px !important',
        fontWeight: '400 !important',
        color: '#FFFFFF'
    }
}));

const ReviewButton = (props) => {
    const classes = useStyles();
    return(
        <Button className={classes.reviewButton} variant="contained" href={props.url} target="_blank">
            <Typography className={classes.buttonText} variant="body1">
                Go To Reviews
            </Typography>
        </Button>
    );
}

export default ReviewButton;