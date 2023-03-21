import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '570px',
        width: '400px',
        border: '1px solid rgba(122, 122, 122, 0.26) !important',
        borderRadius: '10px 10px 8px 8px !important',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)'
    },
    container: {
        rowGap: '5px'
    },
    reviewButton: {
        borderRadius: '10px !important',
        color: 'white',
        height: '25px !important',
    },
    name: {
        fontWeight: '400 !important',
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
    }
}));
  

const MainRestaurantCard = (props) => {
    const { restaurant } = props;
    const classes = useStyles();
    const { photo, rating, name, address } = restaurant;
    console.log(restaurant);
    return(
        <Card className={classes.card} variant="outlined">
            <CardMedia
                component="img"
                src={`data:image/png;base64,${photo}`}
                height="340 !important"
                width="400 !important"
            />
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
                        <Button className={classes.reviewButton} variant="contained">
                            <Typography variant="body1">
                                Go To Reviews
                            </Typography>
                        </Button>
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
            {/* <Box display="flex" alignItems="center">
                <CardMedia
                    component="img"
                    // Add data:image/png;base64, to photo data on backend
                    src={`data:image/png;base64,${photo}`}
                    height="180 !important"
                    width="255 !important"
                />
                <Divider className={classes.divider} orientation="vertical" />
            </Box>
            <CardContent>
                <div className={classes.cardHeadr}>
                    <Box display="flex" alignItems="center">
                        <Box mr={3}>
                            <Chip label={
                                <Typography className={classes.chipFont}>
                                    {open_now ? "OPEN" : "CLOSED"}
                                </Typography>
                            } color={open_now ? "primary" : "warning"} />
                        </Box>
                        <Typography className={classes.rating} variant="body2">
                            {`Rating: ${rating}`}
                        </Typography>
                    </Box>
                </div>                
                <Typography className={classes.name}>
                    {name}
                </Typography>
                <Typography className={classes.status}color="textSecondary">
                    {business_status}
                </Typography>
            </CardContent> */}
        </Card>
    );
}

export default MainRestaurantCard;