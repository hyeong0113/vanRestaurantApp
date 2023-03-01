import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import '../styles/RestaurantCard.css';

function RestaurantCard() {
    // const theme = useTheme();
    // console.log(theme);
    return(
        <Card className="restaurant-card" variant="outlined" sx={{ border: 1 }}>
            <Box display="flex">
                <CardMedia
                    component="img"
                    height="180"
                    width="200"
                    image="https://example.com/example.jpg"
                    alt="Example Photo"
                />
                <Box borderLeft={1} borderColor="grey.500" pl={1} />
                <CardContent>
                    <Chip label={
                        <Typography className="chip-font">
                            OPEN
                        </Typography>
                    } color="primary" />
                    <Typography variant="body1">
                        Rating: 4.8
                    </Typography>
                    <Typography variant="h5">
                        Restaurant title
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Operational
                    </Typography>
                </CardContent>
            </Box>
      </Card>
    );
}

export default RestaurantCard;