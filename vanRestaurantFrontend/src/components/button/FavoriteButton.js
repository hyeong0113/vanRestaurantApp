import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        backgroundColor: '#EFC677 !important',
        borderShadow: '0px 4px 4px rgba(o, o, o, o.25)',
        position: "absolute",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.46)'
    },
    icon: {
        color: '#FFFFFF'
    }
}));

const FavoriteButton = (props) => {
    const classes = useStyles();
    return (
        <IconButton className={classes.button}>
            <FavoriteBorderIcon className={classes.icon} />
        </IconButton>
    );
}

export default FavoriteButton;