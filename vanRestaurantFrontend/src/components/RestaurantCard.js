import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

const CardHeaderDiv = styled.div`
    display: flex;
    align-items: center;
`

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'550px',
        height: '180px',
        borderRadius: '25px !important'
    },
    divider: {
        height: '100%',
        margin: theme.spacing(0, 2),
    },
    chipFont: {
        size: '16px',
        color: '#ffffff'
    },
    media: {
        width: '100%',
        height: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    rating: {
        position: 'absolute',
        marginLeft: '150px !important'
    },
    name: {
        whiteSpace: 'nowrap',
        paddingTop: '25px',
        textAlign: 'left'
    },
    status: {
        paddingRight: '155px',
        paddingTop: '25px',
        textAlign: 'left'
    }
}));
  

const RestaurantCard = (props) => {
    const { restaurant } = props;
    const classes = useStyles();
    const isOpen = restaurant.open_now;

    return(
        <Card className={classes.root}>
            <Box display="flex" alignItems="center">
                <CardMedia
                    component="img"
                    src={`data:image/png;base64,${restaurant.photo}`}
                    height="180 !important"
                    width="220 !important"
                />
                <Divider className={classes.divider} orientation="vertical" />
            </Box>
            <CardContent>
                <CardHeaderDiv>
                    <Box display="flex" alignItems="center">
                        <Box mr={3}>
                            <Chip label={
                                <Typography className={classes.chipFont}>
                                    {isOpen ? "OPEN" : "CLOSED"}
                                </Typography>
                            } color={isOpen ? "primary" : "warning"} />
                        </Box>
                        <Typography className={classes.rating} variant="body1">
                            Rating: {restaurant.rating}
                        </Typography>
                    </Box>
                </CardHeaderDiv>                
                <Typography className={classes.name}>
                    {restaurant.name}
                </Typography>
                <Typography className={classes.status} variant="h6" color="textSecondary">
                    {restaurant.business_status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RestaurantCard;