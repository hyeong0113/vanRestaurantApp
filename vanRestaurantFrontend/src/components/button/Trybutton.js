import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        width: '30%',
        height: '15%',
        borderRadius: '15px !important',
        marginRight: '60% !important',
        marginTop: '14% !important'
    },
    text: {
        color: '#FFFFFF'
    }
  }));

const TryButton = () => {
    const classes = useStyles();
    return (
        <Button className={classes.button} variant="contained" href="/" disableElevation>
            <Typography className={classes.text} variant="h5">
                TRY NOW
            </Typography>
        </Button>
    );
}

export default TryButton;