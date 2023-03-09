import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';

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
    },
    menuItemFont: {
        color: '#524A34'
    }
}));

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#FFF9EB',
        border: '1px solid rgba(0, 0, 0, 0.18)',
        borderRadius: '5px',
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const TopbarMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <AppBar className={classes.bar} position="static">
            <Toolbar className={classes.toolbar} variant="dense">
                <Typography className={classes.title} variant="h6" color="inherit" component="div">
                    VanRestaurant
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <IconButton
                    className={classes.button}
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}                    
                    edge="end"
                    aria-label="menu"
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>    
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        <Typography class={classes.menuItemFont} variant="body4">
                            History
                        </Typography>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose} disableRipple>
                        <Typography class={classes.menuItemFont} variant="body4">
                            Log out
                        </Typography>
                    </MenuItem>
                </StyledMenu>                                
            </Toolbar>
         </AppBar>   
    );
}

export default TopbarMenu;