
import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import FavoriteButton from '../button/FavoriteButton';
import { makeStyles } from '@mui/styles';
import ReviewButton from '../button/GotoReviewButton';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '290px',
        width: '970px',
        border: '1px solid rgba(122, 122, 122, 0.26) !important',
        borderRadius: '10px 10px 8px 8px !important',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex'
    },
    container: {
        rowGap: '5px',
    },
    favoriteButton: {
        textAlign: 'right',
        marginRight: '3% !important',
        marginTop: '2% !important',
    },
    image: {
        position: 'relateive',
        objectFit: 'cover'
    },
    name: {
        textAlign: 'left',
        paddingTop: '3% !important',
    },
    text: {
        fontWeight: '400 !important',
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: 'nowrap',
        textOverflow: "ellipsis",
    },
    ratingIcon: {
        paddingTop: '1.5%',
        paddingRight: '4%'
    },
    leftItem: {
        textAlign: 'left',
        // paddingLeft: '3%',
        paddingTop: '4% !important',

    },
    rightItem: {
        textAlign: 'left',
        paddingTop: '4% !important',
    },
    rating: {
        display: 'flex'
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
        transform: 'translateY(-550%)'
    }
}));

const HistoryCard = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    // const { restaurant, index } = props;
    const classes = useStyles();
    // const { photo, rating, name, address, url, openNow } = restaurant;
    
    const onFavoriteButtonClick = () => {
        setIsSelected((isSelected) => !isSelected);
    }

    return(
        <Card className={classes.card} variant="outlined">
            <CardMedia
                component="img"
                // src={`data:image/png;base64,${photo}`}
                src={'../../assets/images/food1.png'}
                height="235 !important"
                width="400 !important"
                style={{ position: 'relative' }}
            />
            {/* <Grid className={classes.buttonCanainer} container>
                <Grid className={classes.rightItem} item xs={6}>
                    <FavoriteButton isSelected={isSelected} onFavoriteButtonClick={onFavoriteButtonClick} />
                </Grid>
            </Grid>      */}
            <CardContent>
                <Grid className={classes.container} rowSpacing={4} container>
                    <Grid className={classes.favoriteButton} item xs={12}>
                        <FavoriteButton isSelected={isSelected} onFavoriteButtonClick={onFavoriteButtonClick} />
                    </Grid>
                    <Grid className={classes.name} item xs={6}>
                        <Typography variant="h5">
                            {/* {name} */}
                            Test Name
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography variant="h5">
                            {/* {rating} */}
                            3.5
                        </Typography>                            
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography variant="h5">
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <ReviewButton url={"temp"} />
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography variant="h5">
                            Address
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography variant="h5">
                            {/* {address} */}
                            Vancouver Asdsdawd
                        </Typography>                            
                    </Grid>
                </Grid>       
            </CardContent>
        </Card>
    );
}

export default HistoryCard;