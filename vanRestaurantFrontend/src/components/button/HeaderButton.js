import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Popover from '@mui/material/Popover';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
    button: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '400px',
        borderRadius: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '&:focus::after': {
        opacity: 1,
        zIndex: 1
      }
    }
  }));

const HeaderButton = ({ icon }) => {
    const classes = useStyles();
    const [isActive, setIsActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    console.log(anchorEl);

    return (
      <>
        <IconButton onClick={(event) => handleClick(event)}>
          {icon}
        </IconButton>
        <Menu
          id="basic-menu"
          className={`${classes.button} ${open ? 'active' : ''}`} 
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </>
    );
  };
export default HeaderButton;