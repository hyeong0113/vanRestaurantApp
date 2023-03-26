import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FavoriteButton from '../button/FavoriteButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '290px',
        width: '400px',
        border: '1px solid rgba(122, 122, 122, 0.26) !important',
        borderRadius: '10px 10px 8px 8px !important',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    },
    container: {
        rowGap: '5px'
    },
    image: {
        position: 'relateive',
        objectFit: 'cover'
    },
    name: {
        fontWeight: '400 !important',
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: 'nowrap',
        textOverflow: "ellipsis",
    },
    leftItem: {
        textAlign: 'left',
        paddingLeft: '6%'
    },
    rightItem: {
        textAlign: 'right',
        paddingRight: '6%'
    },
    address: {
        textAlign: 'center',
        paddingRight: '6%'
    },
    text: {
        fontWeight: '400 !important',
        fontSize: '15px !important',
    },
    chip: {
        color: '#FFFEFE !important',
        fontFamily: 'Manrope, sans-serif !important',
        fontStyle: 'normal',
        fontWeight: 700,
        height: '40px !important',
        width: '230px !important',
        position: 'absolute',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.46)'
    },
    buttonCanainer: {
        position: 'relative',
        transform: 'translateY(-700%)'
    }
}));

const MediumRestaurantCard = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const { restaurant, index } = props;
    const classes = useStyles();
    const { photo, rating, name, address, url, openNow } = restaurant;
    
    const onFavoriteButtonClick = () => {
        setIsSelected((isSelected) => !isSelected);
    }

    return(
        <Card className={classes.card} variant="outlined">
            <CardMedia
                component="img"
                src={`data:image/png;base64,${photo}`}
                height="150 !important"
                width="400 !important"
                style={{ position: 'relative' }}
            />
            <Grid className={classes.buttonCanainer} container>
                {/* <Grid className={classes.leftItem} item xs={6}>
                    {index === 0 ?
                        <Chip className={classes.chip} color="primary" label="#1" />
                        :
                        <Chip className={classes.chip} color={openNow ? "primary" : "error"} label={openNow ? "OPEN" : "CLOSED"} />
                    }
                </Grid>
                <Grid className={classes.rightItem} item xs={6}>
                    <FavoriteButton isSelected={isSelected} onFavoriteButtonClick={onFavoriteButtonClick} />
                </Grid> */}
            </Grid>     
            <CardContent>
                <Grid className={classes.container} rowSpacing={1} container>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            {rating}
                        </Typography>                            
                    </Grid>                    
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography className={classes.name} variant="h5">
                            {name}
                        </Typography>
                    </Grid>
                </Grid>        
            </CardContent>
        </Card>
    );
}

export default MediumRestaurantCard;