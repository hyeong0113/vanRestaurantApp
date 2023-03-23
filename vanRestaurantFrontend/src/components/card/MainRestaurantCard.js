import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ReviewButton from '../button/GotoReviewButton';
import FavoriteButton from '../button/FavoriteButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '570px',
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
        paddingLeft: '2.5%'
    },
    rightItem: {
        textAlign: 'right',
        paddingRight: '2.5%'
    },
    text: {
        fontWeight: '400 !important',
        fontSize: '20px !important',
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

const MainRestaurantCard = (props) => {
    const { restaurant } = props;
    const classes = useStyles();
    const { photo, rating, name, address } = restaurant;
    return(
        <Card className={classes.card} variant="outlined">
            <CardMedia
                component="img"
                src={`data:image/png;base64,${photo}`}
                height="300 !important"
                width="400 !important"
                style={{ position: 'relative' }}
            />
            <Grid className={classes.buttonCanainer} container>
                <Grid className={classes.leftItem} item xs={6}>
                    <Chip className={classes.chip} color="primary" label="TOP 1 in your location" />
                </Grid>
                <Grid className={classes.rightItem} item xs={6}>
                    <FavoriteButton />
                </Grid>                    
            </Grid>         
            <CardContent>
                <Grid className={classes.container} container>
                    <Grid item xs={12}>
                        <Typography className={classes.name} variant="h5">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <ReviewButton />
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            Rating
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            {rating}
                        </Typography>                            
                    </Grid>
                    <Grid className={classes.leftItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            Address
                        </Typography>
                    </Grid>
                    <Grid className={classes.rightItem} item xs={6}>
                        <Typography className={classes.text} variant="body1">
                            {address}
                        </Typography>                            
                    </Grid>           
                </Grid>        
            </CardContent>
        </Card>
    );
}

export default MainRestaurantCard;