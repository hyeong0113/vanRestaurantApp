import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        backgroundColor: '#FFFFFF !important',
        border: '3px solid rgba(103, 69, 18, 0.5) !important',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    }
}));

const MapIconButton = ({ icon, index }) => {
    const classes = useStyles();
    return (
        <IconButton key={index} className={classes.button}>
            {icon}
        </IconButton>
    );
}

export default MapIconButton;