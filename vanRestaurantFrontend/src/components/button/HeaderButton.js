import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutHandler } from '../../utilities/LogOut';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'relative',
  },
  overlay: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },
  overlayVisible: {
    opacity: 1,
    zIndex: 1
  },
  menu: {
    background: 'transparent !important',
    boxShadow: 'none !important'
  },
  menuItem: {
    marginBottom: '10px !important',
    color: '#FFFFFF !important',
    backgroundColor: '#EFC677 !important',
    borderRadius: '3px !important',
    height: '39px !important',
    fontFamily: 'Manrope, sans-serif !important',
    fontStyle: 'normal !important',
    fontWeight: '550  !important',
    '&.MuiMenuItem-root': {
      textAlign: 'center',
      display: 'block'
    }
  }
}));

const HeaderButton = ({ setIsAuthenticated, iconName, icon, handleIconStyleChange, menu }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleIconStyleChange(iconName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleIconStyleChange(null);
  };

  const handleLogOut = async() => {
    let tokenValue = null;
    let token = null;
    if(localStorage.getItem("authenticated").length > 0) {
        tokenValue = localStorage.getItem("authenticated");
        token = 'Bearer ' + tokenValue;
    }
    const result = await logoutHandler(token);

    if(!result) {
        localStorage.setItem("authenticated", "");
        setIsAuthenticated(false);
        navigate('/');
    }
    else {
        console.log("Unavailable to logout");
    }
  }

  return (
    <div className={classes.button}>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon}
        <div className={`${classes.overlay} ${Boolean(anchorEl) ? classes.overlayVisible : ''}`}></div>
      </IconButton>
      <Menu
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        >
        {menu.map((element, index) => (
          <MenuItem 
            key={index}
            component={Link}
            className={classes.menuItem}
            onClick={element.name === "LOG OUT" ? handleLogOut : handleClose}
            to={element.path}>
              {element.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default HeaderButton;