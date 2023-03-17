import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import food1 from '../assets/images/food1.png';
import food2 from '../assets/images/food2.png';
import food3 from '../assets/images/food3.png';
import food4 from '../assets/images/food4.png';
import food5 from '../assets/images/food5.png';
import { Hidden, Icon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

const images = [food1, food2, food3, food4, food5];

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'rgba(103, 69, 18, 0.46)',
    position: 'absolute',
    overflow: 'hidden',
    height: 400,
  },
  title: {
    width: '190px',
    height: '80px',
    paddingLeft: '5%',
    paddingTop: '30px',
    fontWeight: '600 !important',
    fontStyle: 'normal',
    color: "#ffffff"
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
  },
  homeItem: {
    textAlign: 'right'
  },
  icon: {
    height: '40px !important',
    width: '40px !important',
    color: "#ffffff"
  },
  image: {
    position: 'absolute',
    width: 400,
    height:400,
    paddingTop: 100,
    right: 0
  },
  button: {
    position: 'relative',
    '&::before': {
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
      // overflow: 'initial'
    },
    '&:hover::before': {
      opacity: 1,
    }
  }
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
    <Grid className={classes.background} container>
      <Grid item xs={6}>
        <Typography className={classes.title} variant='h2'>
          NearBy
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid className={classes.homeItem} item xs={6}>
            <IconButton className={classes.button}>
              <HomeIcon className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton className={classes.button}>
              <PersonIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
        <Box
           component="img"
           className={classes.image}
           alt="food image"
           src={backgroundImage}
        /> 
      </Grid>
    </Grid>
  );
}

export default Topbar;