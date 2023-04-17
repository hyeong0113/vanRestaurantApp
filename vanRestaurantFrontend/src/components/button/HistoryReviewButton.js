import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    reviewButton: {
        borderRadius: '15px !important',
        height: '40px !important',
    },
    buttonText: {
        fontSize: '15px !important',
        fontWeight: '400 !important',
        color: '#FFFFFF'
    }
}));

const HistoryReviewButton = (props) => {
    const classes = useStyles();
    return(
        <Button className={classes.reviewButton} variant="contained" href={props.url} target="_blank">
            <Typography className={classes.buttonText} variant="h6">
                Go To Reviews
            </Typography>
        </Button>
    );
}

export default HistoryReviewButton;