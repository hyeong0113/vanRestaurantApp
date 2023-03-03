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
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'550px',
        height: '180px',
        borderRadius: '25px !important',
        border: '4px solid rgb(0 0 0 / 54%) !important'
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
        paddingTop: '25px',
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
    },
    status: {
        paddingRight: '155px',
        paddingTop: '25px',
        textAlign: 'left',
        fontSize: '14px'
    }
}));
  

const RestaurantCard = (props) => {
    const { restaurant } = props;
    const classes = useStyles();
    const isOpen = restaurant.open_now;

    return(
        <Card className={classes.card} variant="outlined">
            <Box display="flex" alignItems="center">
                <CardMedia
                    component="img"
                    src={`data:image/png;base64,${restaurant.photo}`}
                    height="180 !important"
                    width="255 !important"
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
                        <Typography className={classes.rating} variant="body2">
                            Rating: {restaurant.rating}
                        </Typography>
                    </Box>
                </CardHeaderDiv>                
                <Typography className={classes.name}>
                    {restaurant.name}
                </Typography>
                <Typography className={classes.status}color="textSecondary">
                    {restaurant.business_status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RestaurantCard;