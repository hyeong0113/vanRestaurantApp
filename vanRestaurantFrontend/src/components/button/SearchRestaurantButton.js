import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        width: '19%',
        height: '165%',
        borderRadius: '15px !important',
    },
    text: {
        color: '#FFFFFF'
    }
  }));

const SearchRestaurantButton = () => {
    const classes = useStyles();
    return (
        <Button className={classes.button} variant="contained" href="/" disableElevation>
            <Typography className={classes.text} variant="h5">
                Search Restaurant
            </Typography>
        </Button>
    );
}

export default SearchRestaurantButton;