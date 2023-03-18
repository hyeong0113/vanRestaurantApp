import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      borderRadius: '50%',
      width: '64px',
      height: '64px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
}));

const MapIconButton = (icon, index) => {
    const classes = useStyles();
    return (
        <IconButton className={classes.button}>
            {icon}
        </IconButton>
    );
}

export default MapIconButton;