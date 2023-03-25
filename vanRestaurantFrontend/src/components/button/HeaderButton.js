import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
}));

const HeaderButton = ({ icon }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Menu Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Menu Item 3</MenuItem>
      </Menu>
    </div>
  );
};
export default HeaderButton;