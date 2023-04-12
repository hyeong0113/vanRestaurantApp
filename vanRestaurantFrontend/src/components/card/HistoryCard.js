
import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import FavoriteButton from '../button/FavoriteButton';
import { makeStyles } from '@mui/styles';
import HistoryReviewButton from '../button/HistoryReviewButton';

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
    photo: {
        paddingTop: '2.6% !important',
        paddingLeft: '2% !important',
        borderRadius: '10px'
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
    nameText: {
        fontWeight: '400 !important'
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
        paddingLeft: '5%',
        paddingTop: '2.5% !important',
    },
    rightItem: {
        textAlign: 'left',
        paddingTop: '2.5% !important',
    },
    rating: {
        display: 'flex'
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
                className={classes.photo}
                component="img"
                // src={`data:image/png;base64,${photo}`}
                src="1.png"
                height="240 !important"
                width="400 !important"
            />
            <CardContent>
                <Grid className={classes.container} rowSpacing={4} container>
                    <Grid className={classes.favoriteButton} item xs={12}>
                        <FavoriteButton isSelected={isSelected} onFavoriteButtonClick={onFavoriteButtonClick} />
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography className={classes.nameText} variant="h4">
                            {/* {name} */}
                            Test Name
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <div className={classes.rating}>
                            <StarIcon className={classes.ratingIcon} fontSize='medium' />
                            <Typography variant="h5">
                                {/* {rating} */}
                                3.5
                            </Typography>  
                        </div>                         
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography variant="h5">
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <HistoryReviewButton url={"temp"} />
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography variant="h5">
                            Address
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography variant="h6">
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