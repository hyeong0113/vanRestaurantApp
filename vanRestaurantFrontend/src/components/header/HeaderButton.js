import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

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
        transition: 'opacity 0.2s ease-in-out'
      },
      '&:focus::after': {
        opacity: 1,
      }
    }
  }));

const HeaderButton = ({ onClick, index, icon}) => {
    const classes = useStyles();
    const [isActive, setIsActive] = useState(false);
  
    const handleClick = () => {
      setIsActive(!isActive);
      onClick();
    };
  
    return (
      <IconButton className={`${classes.button} ${isActive ? 'active' : ''}`} onClick={handleClick}>
        {icon}
      </IconButton>
    );
  };
export default HeaderButton;