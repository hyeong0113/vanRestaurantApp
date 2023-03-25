import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import food1 from '../../assets/images/food1.png';
import food2 from '../../assets/images/food2.png';
import food3 from '../../assets/images/food3.png';
import food4 from '../../assets/images/food4.png';
import food5 from '../../assets/images/food5.png';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import HeaderButton from '../button/HeaderButton';
import TryButton from '../button/Trybutton';

const images = [food1, food2, food3, food4, food5];

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'rgba(103, 69, 18, 0.46)',
    position: 'positive',
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
  homeItem: {
    textAlign: 'right'
  },
  icon: {
    height: '40px !important',
    width: '40px !important',
    color: "#ffffff"
  },
  iconClicked: {
    color: "#EFC677"
  },
  image: {
    position: 'absolute',
    objectFit: 'cover',
    width: 500,
    height:500,
    right: 0
  },
  phrase: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    paddingTop: '2%',
    paddingRight: '13%'
  },
  colored: {
    color: '#EFC677'
  },
  whiteColored: {
    color: '#FFFFFF'
  },
  menu: {
    '& .MuiList-padding': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    '& .MuiMenuItem-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }  
}));
const homeMenu = ["HOME", "CONTACT", "ABOUT US"];
const userMenu = ["PROFILE", "LOG OUT", "REGISTER"];

const Topbar = () => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(null);
  const backgroundImage = `${images[currentImage]}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleIconStyleChange = (iconName) => {
    setCurrentIcon(iconName);
  }

  return (
    <Grid className={classes.background} container>
      <Grid item xs={6}>
        <Typography className={classes.title} variant="h2">
          NearBy
        </Typography>
        <Typography className={classes.phrase} variant="h4">
          <span className={classes.colored}>Find</span>
          <span className={classes.whiteColored}> favorite</span>
          <span className={classes.colored}>restaurants</span>
          <span className={classes.whiteColored}> near your</span>
          <span className={classes.colored}> location</span>
        </Typography>
        <TryButton />
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid className={classes.homeItem} item xs={6}>
            <HeaderButton
              iconName="home"
              menu={homeMenu}
              icon={<HomeIcon className={`${classes.icon} ${currentIcon==="home" ? classes.iconClicked : ''}`} />}
              handleIconStyleChange={handleIconStyleChange} />
          </Grid>
          <Grid item xs={6}>
            <HeaderButton
              iconName="user"
              menu={userMenu}
              icon={<PersonIcon className={`${classes.icon} ${currentIcon==="user" ? classes.iconClicked : ''}`} />}
              handleIconStyleChange={handleIconStyleChange} />
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