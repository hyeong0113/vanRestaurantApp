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
import HeaderButton from './HeaderButton';

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
  }
}));

const Topbar = () => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const [activeButtons, setActiveButtons] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index) => {
    const indexInArray = activeButtons.indexOf(index);

    if (indexInArray > -1) {
      const newArray = [...activeButtons];
      newArray.splice(indexInArray, 1);
      setActiveButtons(newArray);
    } else {
      setActiveButtons([...activeButtons, index]);
    }
  };

  const backgroundImage = `${images[currentImage]}`;

  return (
    <Grid className={classes.background} container>
      <Grid item xs={6}>
        <Typography className={classes.title} variant='h2'>
          NearBy
        </Typography>
        <Typography className={classes.phrase} variant='h4'>
          <span className={classes.colored}>Find</span>
          <span className={classes.whiteColored}> favorite</span>
          <span className={classes.colored}>restaurants</span>
          <span className={classes.whiteColored}> near your</span>
          <span className={classes.colored}> location</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid className={classes.homeItem} item xs={6}>
            <HeaderButton onClick={() => handleClick(0)} index={0} icon={<HomeIcon className={classes.icon} />} />
          </Grid>
          <Grid item xs={6}>
            <HeaderButton onClick={() => handleClick(1)} index={1} icon={<PersonIcon className={classes.icon} />} />
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