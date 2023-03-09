// Top bar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    bar: {
        height: '55px'
    },
    toolbar: {
        paddingTop: '5px'
    },
    title: {
        fontFamily: ', sans-serif',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#FFFFFF !important'
    },
    button: {
        color: '#FFFFFF !important'
    }
}));

const Menu = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.bar} position="static">
            <Toolbar className={classes.toolbar} variant="dense">
                <Typography className={classes.title} variant="h6" color="inherit" component="div">
                    VanRestaurant
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <IconButton className={classes.button} edge="end" aria-label="menu">
                    <MenuIcon />
                </IconButton>                    
            </Toolbar>
         </AppBar>   
    );
}

export default Menu;