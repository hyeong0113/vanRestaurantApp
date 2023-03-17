import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import food1 from '../assets/images/food1.png';
import food2 from '../assets/images/food2.png';
import food3 from '../assets/images/food3.png';
import food4 from '../assets/images/food4.png';
import food5 from '../assets/images/food5.png';

const images = [food1, food2, food3, food4, food5];

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'rgba(103, 69, 18, 0.46) !important',
    position: 'absolute',
    height: 400,
  },
  // title: {
  //   flexGrow: 1,
  //   margin: theme.spacing(2),
  // },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },  
  image: {
    position: 'absolute',
    width: 370,
    height:370,
    bottom: 0,
    right: 0
  },
}));

const Topbar = () => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const backgroundImage = `${images[currentImage]}`;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.appBar}>
        <Box
            component="img"
            className={classes.image}
            alt="Your logo."
            src={backgroundImage}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;